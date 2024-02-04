<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryForm extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'category_forms';
    protected $fillable = ['user_id', 'category_id', 'description', 'content', 'published'];

    protected $casts = [
        'content' => 'array',
    ];

    public function user()
    {
        return $this->belongsToMany(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function adverts()
    {
        return $this->hasMany(Advert::class, 'category_form_id');
    }
}
