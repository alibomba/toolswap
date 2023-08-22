<?php

namespace App\Models;

use App\Models\Message;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'user1_id',
        'user2_id'
    ];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
