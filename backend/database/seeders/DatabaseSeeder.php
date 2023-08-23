<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Database\Seeder;
use Database\Seeders\LikeSeeder;
use Database\Seeders\RoomSeeder;
use Database\Seeders\UserSeeder;
use App\Models\OfferSubscription;
use Database\Seeders\OfferSeeder;
use Database\Seeders\RentalSeeder;
use Database\Seeders\ReviewSeeder;
use Database\Seeders\MessageSeeder;
use Database\Seeders\CategorySeeder;
use Database\Seeders\LocationSeeder;
use Database\Seeders\NotificationSeeder;

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
            RentalSeeder::class,
            UserSeeder::class,
            NotificationSeeder::class,
            RoomSeeder::class,
            MessageSeeder::class,
            ReviewSeeder::class
        ]);
    }
}
