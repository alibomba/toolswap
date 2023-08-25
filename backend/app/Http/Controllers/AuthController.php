<?php

namespace App\Http\Controllers;

use DateTime;
use Exception;
use Illuminate\Http\Request;
use App\Events\NotificationEvent;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if($token = auth()->attempt($credentials)) {
            return response()->json(['token' => $token]);
        }

        return response()->json(['message' => 'Niepoprawny login lub hasło!'], 401);
    }

    public function refresh()
    {
        try {
            $token = auth()->refresh();
            return response()->json(['token' => $token]);
        } catch(JWTException $e) {
            return response()->json(['message' => 'Token could not be refreshed, please login again'], 401);
        }
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Wylogowano']);
    }

    public function auth()
    {
        return response('', 200);
    }

    public function me()
    {
        return auth()->user();
    }

    public function changePassword(Request $request)
    {
        $messages = [
            'password.required' => 'Hasło jest wymagane',
            'min' => 'Nowe hasło musi mieć przynajmniej :min znaków',
            'max' => 'Nowe hasło może mieć maksymalnie :max znaków',
            'confirmed' => 'Hasła nie są identyczne'
        ];

        $request->validate([
            'password' => 'required|string',
            'newPassword' => 'required|string|min:8|max:50|confirmed'
        ], $messages);

        $user = auth()->user();
        if(!password_verify($request['password'], $user->password)) {
            return response(['message' => 'Niepoprawne hasło'], 401);
        }

        $user->password = Hash::make($request['newPassword']);
        $user->save();

        return response(['message' => 'Zmieniono hasło']);
    }

    public function changeEmail(Request $request)
    {
        $messages = [
            'email.email' => 'Podaj poprawny adres e-mail',
            'required' => 'Oba pola są wymagane'
        ];

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ], $messages);

        $user = auth()->user();
        if(!password_verify($request['password'], $user->password)) {
            return response(['message' => 'Niepoprawne hasło'], 401);
        }

        $user->email = $request['email'];
        $user->save();

        return response(['message' => 'Zmieniono adres e-mail']);
    }

    public function deleteAccount(Request $request)
    {
        $messages = [
            'required' => 'Wszystkie pola są wymagane',
            'email.email' => 'Podaj poprawny adres e-mail'
        ];

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'confirmation' => 'required|string'
        ], $messages);

        $credentials = $request->only('email', 'password');
        if(!auth()->attempt($credentials)) {
            return response(['message' => 'Niepoprawny adres e-mail lub hasło'], 401);
        }

        if($request['confirmation'] !== 'usuwam konto') {
            return response(['message' => 'Napisz "usuwam konto"'], 422);
        }

        $user = auth()->user();
        if(count($user->offers) > 0) {
            foreach($user->offers as $offer) {
                if(count($offer->likes) > 0) {
                    foreach($offer->likes as $like) {
                        $like->delete();
                    }
                }
                if($offer->rental) {
                    $offer->rental->delete();
                }
                if(count($offer->reviews) > 0) {
                    foreach($offer->reviews as $review) {
                        $review->delete();
                    }
                }
                if(count($offer->subscriptions) > 0) {
                    foreach($offer->subscriptions as $subscription) {
                        $subscription->delete();
                    }
                }
                if(count($offer->reports) > 0) {
                    foreach($offer->reports as $report) {
                        $report->delete();
                    }
                }
                $offer->delete();
            }
        }

        if(count($user->likes) > 0) {
            foreach($user->likes as $like) {
                $like->delete();
            }
        }

        if(count($user->rentals) > 0) {
            foreach($user->rentals as $rental) {
                $offerRented = Offer::where('id', $rental->offer_id)->get()[0];
                $offerRented->available = true;
                $offerRented->save();
                $subscriptions = $offerRented->subscriptions;
                $now = new DateTime();
                if(count($subscriptions) > 0) {
                    foreach($subscriptions as $subscription) {
                        broadcast(new NotificationEvent([
                            'content' => 'Oferta '.$offerRented->title.' jest już dostępna',
                            'link' => '/oferta/'.$offerRented->id,
                            'seen' => false,
                            'user_id' => $subscription->user_id,
                            'created_at' => $now->format('Y-m-d H:i:s')
                        ]))->toOthers();
                        $subscription->delete();
                    }
                }
            }
        }

        if(count($user->notifications) > 0) {
            foreach($user->notifications as $notification) {
                $notification->delete();
            }
        }

        if(count($user->messages) > 0) {
            foreach($user->messages as $message) {
                $message->delete();
                if($message->room) {
                    $message->room->delete();
                }
            }
        }

        if(count($user->subscriptions) > 0) {
            foreach($user->subscriptions as $subscription) {
                $subscription->delete();
            }
        }

        if(count($user->reports) > 0) {
            foreach($user->reports as $report) {
                $report->delete();
            }
        }

        return $user->delete();
    }
}
