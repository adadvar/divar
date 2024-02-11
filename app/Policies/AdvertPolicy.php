<?php

namespace App\Policies;

use App\Models\Advert;
use App\Models\AdvertFavourite;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AdvertPolicy
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

    public function update(User $user, Advert $advert = null)
    {
        return ($user->isAdmin() || ($user->id == $advert->user_id));
    }

    public function showAdmin(User $user, Advert $advert = null)
    {
        return $user->isAdmin();
    }

    public function listAdmin(User $user, Advert $advert = null)
    {
        return $user->isAdmin();
    }

    public function changeState(User $user, Advert $advert)
    {
        return $user->isAdmin();
    }


    public function delete(User $user, Advert $advert = null)
    {
        return ($user->isAdmin() || ($user->id == $advert->user_id));
    }

    public function like(User $user = null, Advert $advert = null)
    {
        if ($advert && $advert->isAccepted()) {
            $conditions = [
                'advert_id' => $advert->id,
                'user_id' => $user ? $user->id : null
            ];

            if (empty($user)) {
                $conditions['user_ip'] = client_ip();
            }
            return AdvertFavourite::where($conditions)->count() == 0;
        }

        return false;
    }

    public function unlike(User $user = null, Advert $advert = null)
    {
        $conditions = [
            'Advert_id' => $advert->id,
            'user_id' => $user ? $user->id : null
        ];

        if (empty($user)) {
            $conditions['user_ip'] = client_ip();
        }

        return AdvertFavourite::where($conditions)->count();
    }

    public function deleteFavourite(User $user = null, Advert $advert = null)
    {
        return $user->favouriteAdverts->find($advert->id);
    }

    public function deleteRecent(User $user = null, Advert $advert = null)
    {
        return $user->recentAdverts->find($advert->id);
    }
}
