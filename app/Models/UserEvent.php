<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserEvent extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'user_events';
    protected $fillable = ['user_id', 'message_count', 'notification_count'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
