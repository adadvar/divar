<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Advert extends Model
{
    use HasFactory, SoftDeletes;

    const STATE_PENDING = 'pending';
    const STATE_ACCEPTED = 'accepted';
    const STATE_BLOCKED = 'blocked';
    const STATE = [self::STATE_PENDING, self::STATE_ACCEPTED, self::STATE_BLOCKED];

    protected $table = 'adverts';
    protected $fillable = ['user_id', 'category_id', 'category_form_id', 'content', 'city_id', 'title', 'slug', 'slug_url', 'info', 'lat', 'long', 'price', 'images', 'publish_at', 'state'];

    protected $appends = ['age'];

    protected $casts = [
        'content' => 'array',
        'images' => 'array',
    ];

    // public function getRouteKeyName()
    // {
    //     return 'slug_url';
    // }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function form()
    {
        return $this->belongsTo(CategoryForm::class, 'category_form_id');
    }

    public function viewers()
    {
        return $this
            ->belongsToMany(User::class, 'advert_views')
            ->withTimestamps();
    }

    public function photos()
    {
        return $this->belongsTo(Category::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function isInState($state)
    {
        return $this->state == $state;
    }

    public function isPending()
    {
        return $this->isInState(self::STATE_PENDING);
    }

    public function isAccepted()
    {
        return $this->isInState(self::STATE_ACCEPTED);
    }

    public function isBlocked()
    {
        return $this->isInState(self::STATE_BLOCKED);
    }

    public static function views($userId)
    {
        return static::where('adverts.user_id', $userId)
            ->join('advert_views', 'adverts.id', '=', 'advert_views.advert_id');
    }



    public function getAgeAttribute()
    {
        $diff = $this->created_at->diffForHumans(null, true, true, 2);
        return $diff;
    }
}
