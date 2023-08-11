<?php

namespace Database\Seeders;

use App\Models\Like;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LikeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Like::create([
            'user_id' => 1,
            'offer_id' => 1
        ]);
    }
}
