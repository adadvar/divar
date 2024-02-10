<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Transliterator;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Category::count()) {
            Category::truncate();
        }

        $categories = [
            'املاک',
            'وسایل نقلیه',
            'کالای دیجیتال',
            'خانه و آشپزخانه',
        ];
        $icons = [
            'BiBuildingHouse',
            'BiCar',
            'BiStore',
            'BiHome'
        ];
        $subcategories = [
            ['فروش مسکونی', 'اجاره مسکونی', 'فروش اداری و تجاری', 'اجاره اداری و تجاری', 'اجاره کوتاه مدت', 'پروژه های ساخت و ساز',],
            ['خودرو', 'موتورسیکلت', 'قطعات یدکی و لوازم جانبی', 'قایق و سایر وسایل نقلیه',],
            ['موبایل و تبلت', 'رایانه', 'کنسول.بازی ویدیويی وآنلاین', 'صوتی و تصویری', 'تلفن رومیزی',],
            ['لوازم خانگی برقی', 'ظروف و لوازم آشپزخانه', 'خوردنی و آشامیدنی', 'خیاطی و بافتنی', 'مبلمان و صنایع چوب', 'نور و روشنایی', 'فرش. گلیم و موکت', 'تشک. روتختی و رختخواب', 'لوازم دکوریو تزیینی', 'تهویه. سرمایش و گرمایش', 'شتست و شو و نظافت', 'حمام و سرویس بهداشتی',],
        ];


        foreach ($categories as $i => $Category) {
            Category::create([
                'title' => $Category,
                'parent_id' => null,
                'slug' => Str::slug($Category, '-'),
                'icon' => $icons[$i]
            ]);
        }
        foreach ($subcategories as $k => $subcategories2) {
            foreach ($subcategories2 as $subCategory) {
                Category::create([
                    'title' => $subCategory,
                    'parent_id' => $k + 1,
                    'slug' => Str::slug($subCategory, '-'),
                ]);
            }
        }
    }
}
