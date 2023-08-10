<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ReadyAnswer extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'ready_answers';
    protected $fillable = ['property_id', 'text'];

    public function property()
    {
        return $this->belongsToMany(Property::class);
    }
}
