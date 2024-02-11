<?php

namespace App\Http\Controllers;

use App\Events\VisitAdvert;
use App\Http\Requests\Advert\AdvertChangeStateRequest;
use App\Http\Requests\Advert\AdvertCreateRequest;
use App\Http\Requests\Advert\AdvertDeleteFavouriteRequest;
use App\Http\Requests\Advert\AdvertDeleteRecentRequest;
use App\Http\Requests\Advert\AdvertDeleteRequest;
use App\Http\Requests\Advert\AdvertFavouriteRequest;
use App\Http\Requests\Advert\AdvertLikeRequest;
use App\Http\Requests\Advert\AdvertListAdminRequest;
use App\Http\Requests\Advert\AdvertShowAdmineRequest;
use App\Http\Requests\Advert\AdvertUnlikeRequest;
use App\Http\Requests\Advert\AdvertUpdateRequest;
use App\Models\Advert;
use App\Models\AdvertFavourite;
use App\Models\AdvertRecent;
use App\Models\Category;
use App\Models\City;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AdvertController extends Controller
{
    public function create(AdvertCreateRequest $r)
    {
        try {
            $user = auth()->user();
            $data = $r->validated();
            $data['user_id'] = $user->id;
            $category = $r->category;
            $data['category_id'] = $category->id;
            $imageArr = [];
            if (!empty($r->file('images'))) {
                foreach ($r->file('images') as $file) {
                    $image = $file;
                    $imageName = time() . bin2hex(random_bytes(5)) . '-image';
                    Storage::disk('')->put('/' . $user->id . '/' . $imageName, $image->get());
                    $imageArr[] = $imageName;
                }
            }
            $data['images'] = ($imageArr);
            $cat_title = $category->title;
            $city = City::find($r->city_id);
            $slug_url = str_replace(' ', '-', env('APP_NAME') . ' ' . $city->name . ' ' . $r->title . ' ' . $cat_title . ' ' . bin2hex(random_bytes(4)));
            $slug = bin2hex(random_bytes(5));
            $data['slug'] = $slug;
            $data['slug_url'] = $slug_url;
            $form = $category->form()->where('published', true)->first();
            if ($form) {
                $advert = $form->adverts()->create($data);
                return response($advert, 200);
            }
            return response(['message' => 'فرم موجود نمی باشد!'], 404);
        } catch (Exception $e) {

            Log::error($e->getTraceAsString());
            return response(['message' => 'خطایی رخ داده است!'], 500);
        }
    }

    public function update(AdvertUpdateRequest $r)
    {

        try {
            $user = auth()->user();
            $advert = $r->advert;
            $category = $advert->category;
            $data = $r->validated();
            $data['user_id'] = $user->id;
            $data['category_id'] = $category->id;
            $imageArr = [];
            if (!empty($r->file('images'))) {
                foreach ($r->file('images') as $file) {
                    $image = $file;
                    $imageName = time() . bin2hex(random_bytes(5)) . '-image';
                    Storage::disk('adverts')->put('/' . $user->id . '/' . $imageName, $image->get());
                    $imageArr[] = $imageName;
                }
            }
            $data['images'] = ($imageArr);
            if (isset($r->title) && isset($r->city_id)) {
                $cat_title = $category->title;
                $city = City::find($r->city_id);
                $slug_url = str_replace(' ', '-', env('APP_NAME') . ' ' . $city->name . ' ' . $r->title . ' ' . $cat_title . ' ' . bin2hex(random_bytes(4)));
                $slug = bin2hex(random_bytes(5));
                $data['slug'] = $slug;
                $data['slug_url'] = $slug_url;
            }


            tap($advert)->update($data);
            return response($advert, 200);
        } catch (Exception $e) {
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است!'], 500);
        }
    }

    public function listAdmin(AdvertListAdminRequest $r)
    {
        $user = auth()->user();
        $form = $r->category->form;

        if ($form) {
            $adverts = $r->category->form->adverts();
            if ($r->q) {
                $adverts->where('title', 'LIKE', '%' . $r->q . '%');
            }
            $adverts = $adverts->with(['category', 'city'])->paginate($r->per_page ?? 10);
            return response(['form' => $form, 'adverts' => $adverts], 200);
        } else {
            return response(['error' => 'Form not found'], 404);
        }
    }

    public function list(Request $r)
    {
        $whereIns = [];
        $conditions = [];
        $cityRequest = null;
        $categoryRequest = null;

        if ($r->param1 && $r->param2) {
            $cityRequest = City::whereSlug($r->param1)->first();
            $categoryRequest = Category::whereSlug($r->param2)->first();
        }
        if ($r->param1 && !$r->param2) {
            $cityRequest = City::whereSlug($r->param1)->first();
            $categoryRequest = Category::whereSlug($r->param1)->first();
        }

        $iran = City::whereSlug('iran')->first();

        if ($cityRequest) {
            $city = $cityRequest->load('child');
            if ($city->id != $iran->id) {
                $ids = City::extractChildrenIds($city);
                $whereIns['city_id'] = $ids;
            }
        }

        if ($r->price) {
            $prices = explode('-', $r->price);
            if ($prices[0]) $conditions[] = ['price', '>=', $prices[0]];
            if ($prices[1]) $conditions[] = ['price', '<=', $prices[1]];
        }

        $conditions['state'] = 'accepted';

        if ($categoryRequest) {
            $ids = (Category::extractChildrenIds($categoryRequest));
            $whereIns['category_id'] = $ids;
        }

        $query = Advert::query();

        $query->where($conditions);
        foreach ($whereIns as $column => $values) {
            $query->whereIn($column, $values);
        }

        $query->with(['user', 'category']);

        if ($r->o == 'n' || $r->o == null) $query->orderBy('id', 'desc');
        if ($r->o == 'pa') $query->orderBy('price', 'asc');
        if ($r->o == 'pd') $query->orderBy('price', 'desc');

        $perPage = $r->per_page ?? 10;
        $adverts = $query->paginate($perPage);

        return response($adverts);
    }

    public function show(Request $r)
    {
        $advert = Advert::where('slug_url', $r->id_slug)
            ->orWhere('id', $r->id_slug)
            ->where('state', 'accepted')
            ->firstOrFail();
        event(new VisitAdvert($advert));
        $advert = $advert->load('user', 'category');
        return $advert;
    }

    public function showAdmin(AdvertShowAdmineRequest $r)
    {
        $advert = Advert::where('slug_url', $r->id_slug)
            ->orWhere('id', $r->id_slug)
            ->firstOrFail();
        $advert = $advert->load('user', 'category', 'city');
        return $advert;
    }

    public static function changeState(AdvertChangeStateRequest $r)
    {
        $advert = $r->advert;
        $advert->state = $r->state;
        // $advert->publish_at = $r->state == 'accepted'? Carbon::now(): '';
        $advert->save();

        return response($advert);
    }

    public function delete(AdvertDeleteRequest $r)
    {
        try {
            DB::beginTransaction();
            $r->advert->delete();
            DB::commit();
            return response(['message' => 'با موفقیت حذف شد!'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است !'], 500);
        }
    }

    public static function like(AdvertLikeRequest $r)
    {
        //ابتدا باید وضعیت advert به accepted تغییر کند
        AdvertFavourite::create([
            'user_id' => Auth::guard('api')->id(),
            'user_ip' => client_ip(),
            'advert_id' => $r->advert->id,
        ]);

        return response(['message' => 'با موفقیت ثبت شد'], 200);
    }

    public static function unlike(AdvertUnlikeRequest $r)
    {
        $user = auth('api')->user();
        $conditions = [
            'advert_id' => $r->advert->id,
            'user_id' => $user ? $user->id : null
        ];

        if (empty($user)) {
            $conditions['user_ip'] = client_ip();
        }

        AdvertFavourite::where($conditions)->delete();
        return response(['message' => 'با موفقیت ثبت شد'], 200);
    }

    public static function favourites(AdvertFavouriteRequest $r)
    {
        $user = auth()->user();
        return response($user->favouriteAdverts);
    }

    public static function deleteFavourite(AdvertDeleteFavouriteRequest $r)
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            AdvertFavourite::where(['user_id' => $user->id, 'advert_id' => $r->advert->id])->forceDelete();
            DB::commit();
            return response(['message' => 'با موفقیت حذف شد!'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است !'], 500);
        }
    }

    public static function recents(Request $r)
    {
        $user = auth()->user();
        return response($user->recentAdverts);
    }

    public static function deleteRecent(AdvertDeleteRecentRequest $r)
    {
        try {
            DB::beginTransaction();
            $user = auth()->user();
            AdvertRecent::where(['user_id' => $user->id, 'advert_id' => $r->advert->id])->forceDelete();
            DB::commit();
            return response(['message' => 'با موفقیت حذف شد!'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است !'], 500);
        }
    }

    public static function my(Request $r)
    {
        $user = auth()->user();
        return response($user->adverts);
    }
}
