<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdvertFavourite extends Pivot
{

    protected $table = 'advert_favourites';
    protected $fillable = ['user_id', 'advert_id', 'user_ip'];
}
