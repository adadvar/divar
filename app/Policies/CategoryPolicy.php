<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\CategoryAnswer;
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

    public function updateCategory(User $user, Category $category)
    {
        return $user->isAdmin();
    }

    public function createForm(User $user, Category $category)
    {
        return $user->isAdmin();
    }
    public function listAdminAnswer(User $user, Category $category)
    {
        return $user->isAdmin();
    }
}
