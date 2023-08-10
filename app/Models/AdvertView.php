<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdvertView extends Pivot
{
    use SoftDeletes;

    protected $table = 'advert_views';
    protected $fillable = ['user_id','user_ip','advert_id'];
}
