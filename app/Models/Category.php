<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'categories';
    protected $fillable = ['parent_id', 'user_id', 'title', 'slug', 'icon', 'banner'];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function setSlugAttribute($value)
    {
        $slug = str_replace(" ", "-", $value);
        $this->attributes['slug'] = $slug;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function adverts()
    {
        return $this->hasMany(Advert::class);
    }

    public function form()
    {
        return $this->hasOne(CategoryForm::class);
    }

    public function answers()
    {
        return $this->hasMany(CategoryAnswer::class);
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function child()
    {
        return $this->hasMany(Category::class, 'parent_id')->with('child');
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($category) {
            $category->children()->delete();
        });
    }

    static function extractChildrenIds($category)
    {
        $categoryIds = [$category->id];

        if ($category->child) {
            foreach ($category->child as $child) {
                $categoryIds = array_merge($categoryIds, self::extractChildrenIds($child));
            }
        }
        return $categoryIds;
    }
}
