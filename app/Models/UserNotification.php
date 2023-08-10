<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserNotification extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'user-notifications';
    protected $fillable = ['user_id', 'title', 'info', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
