<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function createForm(User $user, Category $category)
    {
        return $user->isAdmin();
    }

    public function answerForm(User $user, Category $category)
    {
        return $user->isAdmin();
    }
}
