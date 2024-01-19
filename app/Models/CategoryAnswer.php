<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoryAnswer extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'category_answers';
    protected $fillable = ['user_id', 'advert_id', 'category_form_id', 'content'];

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

    public function form()
    {
        return $this->belongsToMany(CategoryForm::class, 'category_form_id', 'id');
    }
}
