<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (User::count()) {
            // Channel::truncate();
            User::truncate();
        }

        $this->createAdminUser();

        for ($i = 1; $i < 5; $i++) {
            $this->createUser($i);
        }
    }

    private function createAdminUser()
    {
        $user = User::create([
            'type' => User::TYPE_ADMIN,
            'name' => 'مدیر اصلی',
            'password' => '$2y$10$2aM9N38zmG.7jnr9wsTX6Og9inW0iGzHtyQs3QA/TX5m335WY3ReG',
            'email' => 'admin@divar.me',
            'mobile' => '+989000000000',
        ]);

        $user->save();

        $this->command->info('کاربر ادمین اصلی سایت ایجاد شد');
    }

    private function createUser($num = 1)
    {
        $user = User::create([
            'name' => 'کاربر ' . $num,
            'password' => '$2y$10$2aM9N38zmG.7jnr9wsTX6Og9inW0iGzHtyQs3QA/TX5m335WY3ReG',
            'email' => 'user' . $num . '@divar.me',
            'mobile' => '+989' . str_repeat($num, 9),
        ]);

        $user->save();
    }
}
