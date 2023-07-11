<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => '1',
            'category_id' => fake()->numberBetween(1, 18),
            'location_id' => fake()->numberBetween(1, 306),
            'thumbnail' => 'https://picsum.photos/500/300',
            'title' => fake()->word().' '.fake()->word(),
            'description' => fake()->paragraph(),
            'price' => fake()->numberBetween(20, 500),
            'available' => fake()->boolean()
        ];
    }
}
