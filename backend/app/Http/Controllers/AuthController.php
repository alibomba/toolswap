<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
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
}
