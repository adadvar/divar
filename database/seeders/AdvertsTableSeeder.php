<?php

namespace Database\Seeders;

use App\Models\Advert;
use App\Models\Category;
use App\Models\City;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdvertsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(Advert::count()){
            Advert::truncate();
        }

        $userIds = User::pluck('id')->toArray();
        // $cityIds = City::whereDoesntHave('child')->pluck('id')->toArray();
        $categoryIds = Category::whereDoesntHave('child')->pluck('id')->toArray();
        $cityIds = [33,34,35,36,37,53,54,55,56,57];
        $count = 10;

        for ($i = 0; $i < $count; $i++) {
            $categoryId = $categoryIds[array_rand($categoryIds)];
            $userId = $userIds[array_rand($userIds)];
            $cityId = $cityIds[array_rand($cityIds)];
            $price = rand(10, 1000) / 10; // Random price between 1 and 100

            $advertData = [
                'category_id' => $categoryId,
                'user_id' => $userId,
                'title' => $this->generateFakeTitle(),
                'city_id' => $cityId,
                'price' => $price,
            ];

            Advert::create($advertData);
        }
    }

    private function generateFakeTitle()
    {
        $faker = \Faker\Factory::create();
        $title = $faker->sentence;
        $title = Str::limit($title, 50); // Limit the title to 50 characters

        return $title;
    }
}
