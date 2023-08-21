<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\LikeSeeder;
use Database\Seeders\OfferSeeder;
use Database\Seeders\RentalSeeder;
use Database\Seeders\CategorySeeder;
use Database\Seeders\LocationSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LocationSeeder::class,
            CategorySeeder::class,
            OfferSeeder::class,
            LikeSeeder::class,
            RentalSeeder::class
        ]);

        User::create([
            'nickname' => 'AliGamer',
            'phone_number' => '123123123',
            'location_id' => '31',
            'email' => 'ali.gamer@op.pl',
            'password' => '$2y$10$7ad6rIHvKsJ4lN368hOrteqEO2mLIeyERziJ0OpPry1kirIrjeaKK'
        ]);

        User::create([
            'nickname' => 'Wojciech',
            'phone_number' => '123123123',
            'location_id' => '98',
            'email' => 'wojtek@gmail.com',
            'password' => '$2y$10$7ad6rIHvKsJ4lN368hOrteqEO2mLIeyERziJ0OpPry1kirIrjeaKK'
        ]);
    }
}
