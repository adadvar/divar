<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class AdvertRecent extends Pivot
{

    protected $table = 'advert_recents';
    protected $fillable = ['user_id','advert_id'];

    public function advert()
    {
        return $this->belongsToMany(Advert::class);
    }

    public function user()
    {
        return $this->belongsToMany(User::class);
    }
}
