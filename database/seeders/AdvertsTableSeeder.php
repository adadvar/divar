<?php

namespace Database\Seeders;

use App\Models\Advert;
use App\Models\Category;
use App\Models\City;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AdvertsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // if (Advert::count()) {
        //     Advert::truncate();
        // }

        $userIds = User::pluck('id')->toArray();
        // $cityIds = City::whereDoesntHave('child')->pluck('id')->toArray();
        $categoryIds = Category::whereDoesntHave('child')->pluck('id')->toArray();
        $cityIds = [33, 34, 35, 36, 37, 53, 54, 55, 56, 57];
        $count = 100;

        for ($i = 0; $i < $count; $i++) {
            $categoryId = $categoryIds[array_rand($categoryIds)];
            $userId = $userIds[array_rand($userIds)];
            $cityId = $cityIds[array_rand($cityIds)];
            $price = rand(10, 1000) / 10; // Random price between 1 and 100

            $title = 'محصول تستی شماره' . $i;
            $advertData = [
                'category_id' => $categoryId,
                'category_form_id' => $categoryId - 4,
                'user_id' => $userId,
                'title' => $title,
                'slug' => bin2hex(random_bytes(5)),
                'slug_url' => Str::slug($title),
                'city_id' => $cityId,
                'price' => $price,
                'state' => Advert::STATE_ACCEPTED,
                'info' => 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.'
            ];

            Advert::create($advertData);
        }
    }
}
