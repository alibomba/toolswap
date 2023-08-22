<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

        User::create([
            'nickname' => 'Ela',
            'phone_number' => '123123123',
            'location_id' => '192',
            'email' => 'ela@gmail.com',
            'password' => '$2y$10$7ad6rIHvKsJ4lN368hOrteqEO2mLIeyERziJ0OpPry1kirIrjeaKK'
        ]);

        User::create([
            'nickname' => 'Arek',
            'phone_number' => '123123123',
            'location_id' => '11',
            'email' => 'arek@gmail.com',
            'password' => '$2y$10$7ad6rIHvKsJ4lN368hOrteqEO2mLIeyERziJ0OpPry1kirIrjeaKK'
        ]);
    }
}
