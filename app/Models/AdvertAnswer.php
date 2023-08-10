<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdvertAnswer extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'advert_answers';
    protected $fillable = ['user_id','advert_id','category_id','property_id','answer_id','text'];

    public function user()
    {
        return $this->belongsToMany(User::class);
    }

    public function advert()
    {
        return $this->belongsToMany(Advert::class);
    }

    public function category()
    {
        return $this->belongsToMany(Category::class);
    }

    public function property()
    {
        return $this->belongsToMany(Property::class);
    }

    public function readyAnswer()
    {
        return $this->belongsToMany(ReadyAnswer::class, 'answer_id', 'id');
    }
}
