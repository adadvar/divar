<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'properties';
    protected $fillable = ['category_id', 'type_id','label','required'];

    public function category()
    {
        return $this->belongsToMany(Category::class);
    }

    public function type()
    {
        return $this->belongsToMany(PropertyType::class, 'type_id');
    }

    public function readyAnswers(){
        return $this->hasMany(ReadyAnswer::class);
    }
}
