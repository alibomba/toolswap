<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LocationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [UserController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/refresh', [AuthController::class, 'refresh']);

Route::get('/location-autocomplete', [LocationController::class, 'getAutocomplete']);

Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/category/{category}', [CategoryController::class, 'show']);

Route::get('/location/{location}', [LocationController::class, 'show']);

Route::get('/offers', [OfferController::class, 'index']);

Route::get('/phrase-search', [OfferController::class, 'phraseSearch']);

Route::get('/search', [OfferController::class, 'search']);

Route::middleware(['refresh', 'jwt.auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/auth', [AuthController::class, 'auth']);
    Route::get('/is-liked/{offer}', [OfferController::class, 'isLiked']);
    Route::post('/toggle-like/{offer}', [OfferController::class, 'toggleLike']);
});
