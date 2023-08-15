<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => User::TYPE_USER,
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => '$2y$10$2aM9N38zmG.7jnr9wsTX6Og9inW0iGzHtyQs3QA/TX5m335WY3ReG',
            'mobile' => '+989' . random_int(1111 , 9999) . random_int(11111 , 99999),
            'avatar' => null,
            'website' => fake()->url(),
            'city_id' => null,
            'verify_code' => null,
            'verified_at' => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
