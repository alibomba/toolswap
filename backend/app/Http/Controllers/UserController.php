<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    private $validationMessages = [
        'nickname.required' => 'Nazwa użytkownika jest wymagana!',
        'nickname.string' => 'Nazwa użytkownika musi być tekstem!',
        'nickname.max' => 'Nazwa użytkownika może mieć maksymalnie :max znaków!',
        'nickname.unique' => 'Nazwa użytkownika jest już zajęta!',
        'phone_number.required' => 'Numer telefonu jest wymagany!',
        'phone_number.max' => 'Numer telefonu może mieć maksymalnie :max znaków!',
        'phone_number.regex' => 'Podaj poprawny numer telefonu!',
        'city.required' => 'Miejscowość jest wymagana!',
        'city.string' => 'Miejscowość musi być tekstem!',
        'city.max' => 'Miejscowość może mieć maksymalnie :max znaków!',
        'email.required' => 'Adres e-mail jest wymagany!',
        'email.email' => 'Podaj poprawny adres e-mail!',
        'email.max' => 'Adres e-mail może mieć maksymalnie :max znaków!',
        'email.unique' => 'Adres e-mail jest już zajęty!',
        'password.required' => 'Hasło jest wymagane!',
        'password.string' => 'Hasło musi być tekstem!',
        'password.min' => 'Hasło musi mieć przynajmniej :min znaków!',
        'password.max' => 'Hasło może mieć maksymalnie :max znaków!',
        'password.confirmed' => 'Hasła nie są identyczne!'
    ];

    public function register(Request $request)
    {
        $request->validate([
            'nickname' => 'required|string|max:20|unique:users',
            'phone_number' => 'required|string|max:20|regex:/^[+0-9][-0-9 ()]*[0-9]$/',
            'city' => 'required|string|max:26',
            'email' => 'required|email|max:30|unique:users',
            'password' => 'required|string|min:8|max:50|confirmed'
        ], $this->validationMessages);

        $location = Location::where('city', $request['city']);

        if($location->count() === 0) {
            return response(['message' => 'Podane miasto nie istnieje w bazie danych!'], 422);
        }

        try {
            User::create([
                'nickname' => $request['nickname'],
                'phone_number' => $request['phone_number'],
                'location_id' => $location->get()[0]->id,
                'email' => $request['email'],
                'password' => Hash::make($request['password'])
            ]);
            return response(['message' => 'Pomyślnie utworzono użytkownika'], 200);
        } catch(Exception $e) {
            return response(['message' => 'Coś poszło nie tak!'], 500);
        }
    }

    public function update(Request $request)
    {
        $messages = [
            'file' => 'Zdjęcie profilowe musi być plikiem',
            'image' => 'Zdjęcie profilowe musi być obrazem',
            'pfp.max' => 'Zdjęcie profilowe może mieć maksymalnie 4MB',
            'nickname.required' => 'Nazwa użytkownika jest wymagana',
            'city.required' => 'Miejscowość jest wymagana',
            'phone_number.required' => 'Numer telefonu jest wymagany',
            'string' => 'Pola muszą być tekstem'
        ];

        $request->validate([
            'pfp' => 'file|image|max:4096',
            'nickname' => 'required|string',
            'city' => 'required|string',
            'phone_number' => 'required|string'
        ], $messages);

        $user = auth()->user();

        $location_found = Location::where('city', $request['city'])->get();
        if(count($location_found) === 0) {
            return response([
                'message' => 'Nie znaleziono miasta w bazie danych'
            ], 422);
        }

        if($request->hasFile('pfp')) {
            $image = $request->file('pfp');
            $path = $image->store('public/pfp');
            $url = basename(Storage::url($path));
            $user->profile_picture = $url;
        }

        $user->nickname = $request['nickname'];
        $user->location_id = $location_found[0]->id;
        $user->phone_number = $request['phone_number'];
        $user->save();

        return response([
            'message' => 'Zaktualizowano użytkownika'
        ], 200);
    }
}
