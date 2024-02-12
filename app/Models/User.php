<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    const TYPE_ADMIN = 'admin';
    const TYPE_USER = 'user';
    const TYPES = [self::TYPE_ADMIN, self::TYPE_USER];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'mobile',
        'email',
        'name',
        'password',
        'google_id',
        'type',
        'avatar',
        'website',
        'city_id',
        'is_active',
        'verify_code',
        'verified_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password', 'verify_code'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'verified_at' => 'datetime',
    ];

    // public function findForPassport($username)
    // {
    //     $user = $this->where('mobile', to_valid_mobile_number($username))->orWhere('email', $username)->first();
    //     return $user;
    // }

    public function setMobileAttribute($value)
    {
        $this->attributes['mobile'] = to_valid_mobile_number($value);
    }

    public function isAdmin()
    {
        return $this->type === User::TYPE_ADMIN;
    }

    public function isUser()
    {
        return $this->type === User::TYPE_USER;
    }

    public function adverts()
    {
        return $this->hasMany(Advert::class)->withTrashed();
    }

    public function forms()
    {
        return $this->hasMany(CategoryForm::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function favouriteAdverts()
    {
        return $this->hasManyThrough(
            Advert::class,
            AdvertFavourite::class,
            'user_id', //advert_favorites.user_id
            'id', //advert.id
            'id', //user.id
            'advert_id', //advert_favorites.advert_id
        );
    }

    public function recentAdverts()
    {
        return $this->hasManyThrough(
            Advert::class,
            AdvertRecent::class,
            'user_id', //advert_favorites.user_id
            'id', //advert.id
            'id', //user.id
            'advert_id', //advert_favorites.advert_id
        );
    }

    public function views()
    {
        return $this
            ->belongsToMany(Advert::class, 'advert_views')
            ->withTimestamps();
    }
}
