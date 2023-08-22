<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $rooms = Room::where('user1_id', $user->id)->orWhere('user2_id', $user->id)->get();
        $response = [];
        if(count($rooms) === 0) {
            return response([]);
        }

        foreach($rooms as $room) {
            if($room->user1_id === $user->id) {
                $secondUser = User::find($room->user2_id);
            } elseif($room->user2_id === $user->id) {
                $secondUser = User::find($room->user1_id);
            }

            $messages = Message::where('room_id', $room->id)->orderBy('id', 'DESC')->limit(1)->get();
            if(count($messages) > 0) {
                $message = $messages[0];
                $lastMessage = $message->content;
                if($message->sender_id === $user->id) {
                    $lastMessageIsMine = true;
                } else {
                    $lastMessageIsMine = false;
                }
                $lastMessageDate = $message->created_at;

            } else {
                $lastMessage = null;
                $lastMessageIsMine = null;
                $lastMessageDate = null;
            }

            $response[] = [
                'roomId' => $room->id,
                'profilePicture' => $secondUser->profile_picture,
                'nickname' => $secondUser->nickname,
                'lastMessage' => $lastMessage,
                'lastMessageIsMine' => $lastMessageIsMine,
                'lastMessageDate' => $lastMessageDate
            ];
        }

        return response($response);
    }
}
