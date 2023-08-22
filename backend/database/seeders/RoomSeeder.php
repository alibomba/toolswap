<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Room::create([
            'user1_id' => 1,
            'user2_id' => 2
        ]);

        Room::create([
            'user1_id' => 1,
            'user2_id' => 3
        ]);

        Room::create([
            'user1_id' => 1,
            'user2_id' => 4
        ]);

        Room::create([
            'user1_id' => 2,
            'user2_id' => 3
        ]);

        Room::create([
            'user1_id' => 4,
            'user2_id' => 3
        ]);
    }
}
