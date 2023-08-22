<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
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
        return $user->delete();
    }
}
