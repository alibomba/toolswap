<?php

namespace Database\Seeders;

use App\Models\Rental;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RentalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rental::create([
            'user_id' => 1,
            'offer_id' => 20,
            'status' => 'rented'
        ]);

        Rental::create([
            'user_id' => 1,
            'offer_id' => 21,
            'status' => 'rented'
        ]);

        Rental::create([
            'user_id' => 1,
            'offer_id' => 22,
            'status' => 'rented'
        ]);

        Rental::create([
            'user_id' => 1,
            'offer_id' => 23,
            'status' => 'rented'
        ]);

        Rental::create([
            'user_id' => 1,
            'offer_id' => 2,
            'status' => 'rented'
        ]);

        Rental::create([
            'user_id' => 1,
            'offer_id' => 3,
            'status' => 'pending'
        ]);

        Rental::create([
            'user_id' => 1,
            'offer_id' => 4,
            'status' => 'rented'
        ]);

        Rental::create([
            'user_id' => 1,
            'offer_id' => 5,
            'status' => 'rented'
        ]);

        Rental::create([
            'user_id' => 1,
            'offer_id' => 6,
            'status' => 'pending'
        ]);

        Rental::create([
            'user_id' => 1,
            'offer_id' => 7,
            'status' => 'rented'
        ]);
    }
}
