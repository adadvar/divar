<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdvertPhoto extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'advert_photos';
    protected $fillable = ['advert_id','photo'];

    public function advert()
    {
        return $this->belongsToMany(Advert::class);
    }
}
