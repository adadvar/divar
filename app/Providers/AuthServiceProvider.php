<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Advert;
use App\Models\Category;
use App\Models\CategoryAnswer;
use App\Models\User;
use App\Policies\AdvertPolicy;
use App\Policies\CategoryAnswerPolicy;
use App\Policies\CategoryPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Advert::class => AdvertPolicy::class,
        Category::class => CategoryPolicy::class,
        CategoryAnswer::class => CategoryAnswerPolicy::class,
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Passport::tokensExpireIn(now()->addMinutes(config('auth.token_expiration.token')));
        // Passport::refreshTokensExpireIn(now()->addMinutes(config('auth.token_expiration.refresh_token')));
    }
}
