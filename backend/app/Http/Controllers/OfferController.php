<?php

namespace App\Http\Controllers;

use DateTime;
use App\Models\Like;
use App\Models\User;
use App\Models\Offer;
use App\Models\Rental;
use App\Models\Report;
use App\Models\Review;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Events\NotificationEvent;
use App\Models\OfferSubscription;
use Illuminate\Support\Facades\Storage;

class OfferController extends Controller
{
    private function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371;

        $latDiff = deg2rad($lat2 - $lat1);
        $lonDiff = deg2rad($lon2 - $lon1);

        $a = sin($latDiff / 2) * sin($latDiff / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($lonDiff / 2) * sin($lonDiff / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        $distance = $earthRadius * $c;

        return $distance;
    }

    public function index()
    {
        return Offer::orderBy('created_at', 'DESC')->paginate(8);
    }

    public function phraseSearch(Request $request)
    {
        $request->validate([
            'phrase' => 'required|string'
        ]);

        return Offer::where('title', 'LIKE', '%'.$request['phrase'].'%')->orderBy('created_at', 'DESC')->paginate(8);
    }

    public function search(Request $request)
    {
        $query = Offer::query();

        if($request->has('phrase') && !is_null($request['phrase'])) {
            $query->where('title', 'LIKE', '%'.$request['phrase'].'%');
        }

        if($request->has('cenaOd') && !is_null($request['cenaOd'])) {
            $query->where('price', '>=', $request['cenaOd']);
        }

        if($request->has('cenaDo') && !is_null($request['cenaDo'])) {
            $query->where('price', '<=', $request['cenaDo']);
        }

        if($request->has('kategoria') && !is_null($request['kategoria'])) {
            $category_id = Category::where('name', $request['kategoria'])->first()->id;
            $query->where('category_id', $category_id);
        }

        if($request->has('miejscowosc') && !is_null($request['miejscowosc'])) {
            $found = Location::where('city', $request['miejscowosc'])->get();
            if(count($found) === 0) {
                $query->where('location_id', 'brak');
            } else {
                $query->where('location_id', $found->first()->id);
            }
        }

        if($request->has('dostepnosc') && !is_null($request['dostepnosc'])) {
            $query->where('available', $request['dostepnosc']);
        }

        if($request->has('dystans') && !is_null($request['dystans']) && $request->has('latitude') && !is_null($request['latitude']) && $request->has('longitude') && !is_null($request['longitude'])) {
            $dystans = $request['dystans'];
            $filteredOffers = $query->get();
            $matchingIds = [];
            if(count($filteredOffers) > 0) {
                foreach($filteredOffers as $offer) {
                    $offerLatitude = $offer->location->latitude;
                    $offerLongitude = $offer->location->longitude;
                    $offerDistance = $this->calculateDistance($request['latitude'], $request['longitude'], $offerLatitude, $offerLongitude);
                    if($offerDistance <= $dystans) {
                        $matchingIds[] = $offer->id;
                    }
                }
            }
            if(count($matchingIds) > 0) {
                foreach($matchingIds as $index => $id) {
                    if($index === 0) {
                        $query->where('id', $id);
                    } else {
                        $query->orWhere('id', $id);
                    }
                }
            } else {
                $query->where('id', 'brak');
            }
        }
        return $query->orderBy('created_at', 'DESC')->paginate(8);
    }

    public function isLiked(Offer $offer)
    {
        $user = auth()->user();
        $isLiked = false;
        foreach($user->likes as $like) {
            if($like->offer_id === $offer->id) {
                $isLiked = true;
            }
        }
        return response([
            'isLiked' => $isLiked
        ], 200);
    }

    public function toggleLike(Offer $offer)
    {
        $user = auth()->user();
        $isLiked = false;
        if(count($user->likes) > 0) {
            foreach($user->likes as $like) {
                if($like->offer_id === $offer->id) {
                    $isLiked = true;
                }
            }
        }

        if($isLiked) {
            $like = $user->likes->where('offer_id', $offer->id)->first();
            $like->delete();
            return response([
                'message' => 'Usunięto z obserwowanych'
            ], 200);
        } else {
            return Like::create([
                'user_id' => $user->id,
                'offer_id' => $offer->id
            ]);
        }
    }

    public function favorites()
    {
        $user = auth()->user();
        $query = Offer::query();
        if(count($user->likes) > 0) {
            foreach($user->likes as $index => $like) {
                if($index === 0) {
                    $query->where('id', $like->offer_id);
                } else {
                    $query->orWhere('id', $like->offer_id);
                }
            }
        } else {
            $query->where('id', 'brak');
        }

        return $query->orderBy('created_at', 'DESC')->paginate(8);
    }

    public function myOffers()
    {
        $user = auth()->user();
        $offers = $user->offers;
        $query = Offer::query();
        if(count($offers) > 0) {
            foreach($offers as $index => $offer) {
                if($index === 0) {
                    $query->where('id', $offer->id);
                } else {
                    $query->orWhere('id', $offer->id);
                }
            }
        } else {
            $query->where('id', 'brak');
        }

        return $query->orderBy('created_at', 'DESC')->paginate(8);
    }

    public function destroy(Offer $offer)
    {
        return $offer->delete();
    }

    public function returnProduct($offer_id)
    {
        $rental = Rental::where('offer_id', $offer_id)->get();
        if(count($rental) === 0) {
            return response(['message' => 'Dana oferta nie jest wynajęta'], 400);
        }
        $user = auth()->user();
        $offer = Offer::find($offer_id);
        $rental = $rental[0];
        $rental->status = 'pending';
        $now = new DateTime();
        broadcast(new NotificationEvent([
            'content' => 'Użytkownik '.$user->nickname.' oddał Twój produkt '.$offer->title,
            'link' => '/edytuj/'.$offer_id,
            'seen' => false,
            'user_id' => $offer->user_id,
            'created_at' => $now->format('Y-m-d H:i:s')
        ]))->toOthers();
        $rental->save();
        return response(['message' => 'Wysłano wniosek oddania'], 200);
    }

    public function acceptReturn(Offer $offer)
    {
        return $offer;
    }

    public function toReturn()
    {
        $user = auth()->user();
        $rentals = $user->rentals;
        $query = Offer::query();
        if(count($rentals) > 0) {
            foreach($rentals as $index => $rental) {
                if($index === 0) {
                    $query->where('id', $rental->offer_id);
                } else {
                    $query->orWhere('id', $rental->offer_id);
                }
            }
        } else {
            $query->where('id', 'brak');
        }

        return $query->orderBy('created_at', 'DESC')->paginate(8);
    }

    public function rentalStatus(Offer $offer)
    {
        return $offer->rental->status;
    }

    public function offerData(Offer $offer)
    {
        $location = [
            'city' => $offer->location->city,
            'voivodeship' => $offer->location->voivodeship
        ];
        $category = $offer->category->name;

        return response([
            'offer' => $offer,
            'user' => $offer->user,
            'location' => $location,
            'category' => $category
        ]);
    }

    public function addView(Offer $offer)
    {
        $offer->views = $offer->views + 1;
        $offer->save();
        return response(['views' => $offer->views]);
    }

    public function averageStarsOffer(Offer $offer)
    {
        if(count($offer->reviews) === 0) {
            return response([
                'average' => 1
            ]);
        }

        $reviewsNumber = count($offer->reviews);
        $sum = 0;
        foreach($offer->reviews as $review) {
            $sum += $review->stars;
        }
        $average = round($sum / $reviewsNumber, 0, PHP_ROUND_HALF_UP);
        return response([
            'average' => $average
        ]);
    }

    public function averageStarsUser(User $user)
    {
        $offers = $user->offers;
        if(count($offers) === 0) {
            return response(['message' => 'Użytkownik nie posiada ofert'], 400);
        }
        $reviews = [];

        foreach($offers as $offer) {
            $offerReviews = $offer->reviews->toArray();
            $reviews = array_merge($reviews, $offerReviews);
        }

        if(count($reviews) === 0) {
            return response([
                'average' => 1
            ]);
        }

        $reviewsNumber = count($reviews);
        $sum = 0;
        foreach($reviews as $review) {
            $sum += $review['stars'];
        }
        $average = round($sum / $reviewsNumber, 0, PHP_ROUND_HALF_UP);
        return response([
            'average' => $average
        ]);
    }

    public function subscribe(Offer $offer)
    {
        $user = auth()->user();
        $subscriptions = OfferSubscription::where('offer_id', $offer->id)->where('user_id', $user->id)->get();
        if(count($subscriptions) > 0) {
            return response(['message' => 'Już zasubskrybowano'], 400);
        }

        return OfferSubscription::create([
            'offer_id' => $offer->id,
            'user_id' => $user->id
        ]);
    }

    public function isSubscribed(Offer $offer)
    {
        $user = auth()->user();
        $subscriptions = OfferSubscription::where('offer_id', $offer->id)->where('user_id', $user->id)->get();
        if(count($subscriptions) > 0) {
            return response([
                'isSubscribed' => true
            ]);
        } else {
            return response([
                'isSubscribed' => false
            ]);
        }
    }

    public function sendReview(Offer $offer, Request $request)
    {
        $request->validate([
            'stars' => 'required|numeric'
        ]);

        $user = auth()->user();

        if($offer->user_id === $user->id) {
            return response([
                'message' => 'Nie możesz wystawić opinii samemu sobie'
            ], 400);
        }

        Review::create([
            'offer_id' => $offer->id,
            'stars' => $request['stars']
        ]);

        return response([
            'message' => 'Wystawiono opinię'
        ]);
    }

    public function sendReport(Offer $offer)
    {
        $user = auth()->user();
        $reports = Report::where('offer_id', $offer->id)->where('user_id', $user->id)->get();
        if(count($reports) > 0) {
            return response([
                'message' => 'Możesz wysłać tylko jedno zgłoszenie na ofertę'
            ], 400);
        }

        return Report::create([
            'offer_id' => $offer->id,
            'user_id' => $user->id
        ]);
    }

    public function userOffers(User $user)
    {
        return Offer::where('user_id', $user->id)->orderBy('created_at', 'DESC')->paginate(8);
    }

    private function validationMessages()
    {
        return [
            'category.required' => 'Kategoria jest wymagana',
            'location.required' => 'Lokalizacja jest wymagana',
            'thumbnail.required' => 'Miniatura jest wymagana',
            'thumbnail.file' => 'Miniatura musi być plikiem',
            'thumbnail.image' => 'Miniatura musi być obrazem',
            'thumbnail.max' => 'Miniatura może mieć maksymalnie 4MB',
            'title.required' => 'Tytuł jest wymagany',
            'title.max' => 'Tytuł może mieć maksymalnie :max znaków',
            'description.required' => 'Opis jest wymagany',
            'description.max' => 'Opis może mieć maksymalnie :max znaków',
            'price.required' => 'Cena jest wymagana',
            'price.numeric' => 'Cena musi być liczbą',
            'string' => 'Wszystkie pola oprócz ceny i miniatury muszą być tekstem'
        ];
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => 'required|string',
            'location' => 'required|string',
            'thumbnail' => 'required|file|image|max:4096',
            'title' => 'required|string|max:35',
            'description' => 'required|string|max:300',
            'price' => 'required|numeric'
        ], $this->validationMessages());

        $categories = Category::where('name', $request['category'])->get();
        if(count($categories) === 0) {
            return response(['message' => 'Podana kategoria nie istnieje'], 422);
        } else {
            $category_id = $categories[0]->id;
        }

        $locations = Location::where('city', $request['location'])->get();
        if(count($locations) === 0) {
            return response(['message' => 'Podane miasto nie istnieje w bazie danych'], 422);
        } else {
            $location_id = $locations[0]->id;
        }

        if($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('public/offers');
            $url = basename(Storage::url($path));
        } else {
            return response(['message' => 'Miniatura jest wymagana'], 422);
        }

        $user = auth()->user();

        Offer::create([
            'user_id' => $user->id,
            'category_id' => $category_id,
            'location_id' => $location_id,
            'thumbnail' => $url,
            'title' => $request['title'],
            'description' => $request['description'],
            'price' => $request['price']
        ]);

        return response([
            'message' => 'Oferta została utworzona'
        ], 201);
    }

    public function update(Offer $offer, Request $request)
    {
        $user = auth()->user();
        if($user->id !== $offer->user_id) {
            return response(['message' => 'Nie możesz edytować nie swojej oferty'], 403);
        }

        $request->validate([
            'category' => 'required|string',
            'location' => 'required|string',
            'thumbnail' => 'file|image|max:4096',
            'title' => 'required|string|max:35',
            'description' => 'required|string|max:300',
            'price' => 'required|numeric'
        ], $this->validationMessages());

        $categories = Category::where('name', $request['category'])->get();
        if(count($categories) === 0) {
            return response(['message' => 'Podana kategoria nie istnieje'], 422);
        } else {
            $category_id = $categories[0]->id;
        }

        $locations = Location::where('city', $request['location'])->get();
        if(count($locations) === 0) {
            return response(['message' => 'Podane miasto nie istnieje w bazie danych'], 422);
        } else {
            $location_id = $locations[0]->id;
        }

        $url = null;
        if($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('public/offers');
            $url = basename(Storage::url($path));
        }

        $offer->category_id = $category_id;
        $offer->location_id = $location_id;
        if(!is_null($url)) {
            $offer->thumbnail = $url;
        }
        $offer->title = $request['title'];
        $offer->description = $request['description'];
        $offer->price = $request['price'];
        $offer->save();

        return response([
            'message' => 'Oferta została zapisana'
        ], 200);
    }

    public function isOfferMine(Offer $offer)
    {
        $user = auth()->user();
        if($user->id === $offer->user_id) {
            return response('', 204);
        } else {
            return response([
                'message' => 'Nie możesz edytować nie swojej oferty'
            ], 403);
        }
    }

    public function offerMakeAvailable(Offer $offer)
    {
        $user = auth()->user();
        if($user->id !== $offer->user_id) {
            return response([
                'message' => 'Nie możesz zmienić widoczności nie swojej oferty'
            ], 403);
        }
        if($offer->available) {
            return response([
                'message' => 'Oferta jest już aktywna'
            ], 400);
        }
        $offer->available = true;
        $offer->save();
        $offer->rental->delete();
        $subscriptions = $offer->subscriptions;
        $now = new DateTime();
        if(count($subscriptions) > 0) {
            foreach($subscriptions as $subscription) {
                broadcast(new NotificationEvent([
                    'content' => 'Oferta '.$offer->title.' jest już dostępna',
                    'link' => '/oferta/'.$offer->id,
                    'seen' => false,
                    'user_id' => $subscription->user_id,
                    'created_at' => $now->format('Y-m-d H:i:s')
                ]))->toOthers();
                $subscription->delete();
            }
        }

        return response([
            'message' => 'Oferta została zmieniona'
        ], 200);
    }

    public function offerMakeUnavailable(Offer $offer, Request $request)
    {
        $user = auth()->user();
        if($user->id !== $offer->user_id) {
            return response([
                'message' => 'Nie możesz zmienić widoczności nie swojej oferty'
            ], 403);
        }

        $request->validate([
            'nickname' => 'required|string'
        ], [
            'nickname.required' => 'Nazwa użytkownika jest wymagana',
            'nickname.string' => 'Nazwa użytkownika musi być tekstem'
        ]);

        $users = User::where('nickname', $request['nickname'])->get();
        if(count($users) === 0) {
            return response([
                'message' => 'Podany użytkownik nie istnieje'
            ], 422);
        }

        Rental::create([
            'user_id' => $users[0]->id,
            'offer_id' => $offer->id
        ]);

        $offer->available = false;
        $offer->save();

        return response([
            'message' => 'Oferta została zmieniona'
        ], 200);
    }
}
