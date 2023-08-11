<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Offer;
use App\Models\Category;
use App\Models\Location;
use Illuminate\Http\Request;

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
        return $query->paginate(8);
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
}
