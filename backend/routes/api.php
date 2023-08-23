<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\NotificationController;

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

Route::get('/offer-data/{offer}', [OfferController::class, 'offerData']);

Route::post('/add-view/{offer}', [OfferController::class, 'addView']);

Route::get('/average-stars-offer/{offer}', [OfferController::class, 'averageStarsOffer']);

Route::get('/average-stars-user/{user}', [OfferController::class, 'averageStarsUser']);

Route::middleware(['refresh', 'jwt.auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/auth', [AuthController::class, 'auth']);
    Route::get('/is-liked/{offer}', [OfferController::class, 'isLiked']);
    Route::post('/toggle-like/{offer}', [OfferController::class, 'toggleLike']);
    Route::get('/favorites', [OfferController::class, 'favorites']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/user', [UserController::class, 'update']);
    Route::get('/my-offers', [OfferController::class, 'myOffers']);
    Route::delete('/offers/{offer}', [OfferController::class, 'destroy']);
    Route::post('/return-product/{offer_id}', [OfferController::class, 'returnProduct']);
    Route::get('/to-return', [OfferController::class, 'toReturn']);
    Route::get('/rental-status/{offer}', [OfferController::class, 'rentalStatus']);
    Route::post('/accept-return/{offer}', [OfferController::class, 'acceptReturn']);
    Route::put('/change-password', [AuthController::class, 'changePassword']);
    Route::put('/change-email', [AuthController::class, 'changeEmail']);
    Route::delete('/delete-account', [AuthController::class, 'deleteAccount']);
    Route::get('/my-notifications', [NotificationController::class, 'index']);
    Route::post('/set-notifications-to-seen', [NotificationController::class, 'setNotificationsToSeen']);
    Route::get('/notifications-not-seen', [NotificationController::class, 'notSeen']);
    Route::get('/my-rooms', [RoomController::class, 'index']);
    Route::get('/messages-for-room/{room}', [MessageController::class, 'messagesForRoom']);
    Route::post('/messages', [MessageController::class, 'store']);
    Route::post('/subscribe/{offer}', [OfferController::class, 'subscribe']);
    Route::get('/is-subscribed/{offer}', [OfferController::class, 'isSubscribed']);
    Route::get('/has-conversation-with/{user}', [RoomController::class, 'hasConversationWith']);
    Route::post('/create-conversation/{user}', [RoomController::class, 'createConversation']);
    Route::post('/send-review/{offer}', [OfferController::class, 'sendReview']);
    Route::post('/send-report/{offer}', [OfferController::class, 'sendReport']);
});
