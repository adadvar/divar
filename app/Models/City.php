<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $table = 'cities';
    protected $fillable = ['name','parent_id'];

    public function parent()
    {
        return $this->belongsTo(City::class, 'parent_id');
    }

    public function child()
    {
        return $this->hasMany(City::class, 'parent_id')->with('child');
    }

    static function extractChildrenIds($city){
        $cityIds = [$city->id];

        if ($city->child) {
            foreach ($city->child as $child) {
                $cityIds = array_merge($cityIds, self::extractChildrenIds($child));
            }
        }
        return $cityIds;
    }
}
