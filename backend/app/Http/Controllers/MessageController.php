<?php

namespace App\Http\Controllers;

use DateTime;
use App\Models\Room;
use App\Models\User;
use App\Models\Message;
use App\Events\MessageEvent;
use Illuminate\Http\Request;
use App\Events\NotificationEvent;

class MessageController extends Controller
{
    public function messagesForRoom(Room $room)
    {
        $user = auth()->user();
        if($room->user1_id !== $user->id && $room->user2_id !== $user->id) {
            return response(['message' => 'Nie masz dostępu do tej konwersacji'], 403);
        }
        $messages = $room->messages;
        $response = [];
        if(count($messages) > 0) {
            foreach($messages as $message) {
                if($message->sender_id === $user->id) {
                    $isMine = true;
                } else {
                    $isMine = false;
                }
                $response[] = [
                    'isMine' => $isMine,
                    'content' => $message->content,
                    'created_at' => $message->created_at
                ];
            }
            return response($response);
        } else {
            return response([]);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'roomId' => 'required|numeric',
            'message' => 'required|string|max:100'
        ]);

        $user = auth()->user();
        $room = Room::find($request['roomId']);
        if($room->user1_id !== $user->id && $room->user2_id !== $user->id) {
            return response(['message' => 'Nie masz dostępu do tej konwersacji'], 403);
        }
        if($room->user1_id === $user->id) {
            $secondUser = User::find($room->user2_id);
        } elseif($room->user2_id === $user->id) {
            $secondUser = User::find($room->user1_id);
        }

        $message = Message::create([
            'room_id' => $request['roomId'],
            'sender_id' => $user->id,
            'content' => $request['message']
        ]);
        $now = new DateTime();
        broadcast(new MessageEvent($message))->toOthers();
        broadcast(new NotificationEvent([
            'content' => 'Użytkownik '.$user->nickname.' wysłał Ci wiadomość',
            'link' => '/wiadomosci',
            'seen' => false,
            'user_id' => $secondUser->id,
            'created_at' => $now->format('Y-m-d H:i:s')
        ]))->toOthers();

        return response([
            'isMine' => true,
            'content' => $message->content,
            'created_at' => $message->created_at
        ]);
    }
}
