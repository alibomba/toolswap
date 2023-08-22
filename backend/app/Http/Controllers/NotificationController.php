<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $query = Notification::query();
        if(count($user->notifications) > 0) {
            foreach($user->notifications as $index => $notification) {
                if($index === 0) {
                    $query->where('id', $notification->id);
                } else {
                    $query->orWhere('id', $notification->id);
                }
            }
        } else {
            $query->where('id', 'brak');
        }

        return $query->orderBy('created_at', 'DESC')->get();
    }

    public function setNotificationsToSeen()
    {
        $user = auth()->user();
        if(count($user->notifications) > 0) {
            foreach($user->notifications as $notification) {
                $notification->seen = true;
                $notification->save();
            }
            return response('', 204);
        }
    }

    public function notSeen()
    {
        $user = auth()->user();
        $number = Notification::where('user_id', $user->id)->where('seen', false)->count();
        return response(['number' => $number]);
    }
}
