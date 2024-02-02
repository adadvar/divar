<?php

namespace App\Policies;

use App\Models\CategoryAnswer;
use App\Models\User;

class CategoryAnswerPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function update(User $user, CategoryAnswer $categoryAnswer = null)
    {
        return ($user->isAdmin() || ($user->id == $categoryAnswer->user_id));
    }

    public function listAdmin(User $user, CategoryAnswer $categoryAnswer = null)
    {
        return $user->isAdmin();
    }
}
