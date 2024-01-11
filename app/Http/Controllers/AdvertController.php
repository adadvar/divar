<?php

namespace App\Http\Controllers;

use App\Events\VisitAdvert;
use App\Http\Requests\Advert\AdvertAdminShowRequest;
use App\Http\Requests\Advert\AdvertChangeStateRequest;
use App\Http\Requests\Advert\AdvertCreateRequest;
use App\Http\Requests\Advert\AdvertDeleteFavouriteRequest;
use App\Http\Requests\Advert\AdvertDeleteRecentRequest;
use App\Http\Requests\Advert\AdvertDeleteRequest;
use App\Http\Requests\Advert\AdvertFavouriteRequest;
use App\Http\Requests\Advert\AdvertLikeRequest;
use App\Http\Requests\Advert\AdvertListRequest;
use App\Http\Requests\Advert\AdvertShowRequest;
use App\Http\Requests\Advert\AdvertUnlikeRequest;
use App\Http\Requests\Advert\AdvertUpdateRequest;
use App\Http\Requests\Advert\AdvertUploadPhotoRequest;
use App\Http\Requests\Advert\UploadAdvertPhotoRequest;
use App\Models\Advert;
use App\Models\AdvertFavourite;
use App\Models\AdvertRecent;
use App\Models\Category;
use App\Models\City;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class AdvertController extends Controller
{
    public function list(AdvertListRequest $r)
    {
        // $cityCookieId = $r->cookie('city_id');
        // $newCookie = null;
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
        // if ($cityCookieId) {
        //     $city = City::with('child')->find($cityCookieId);
        //     if ($cityRequest && $cityCookieId != $cityRequest) {
        //         // Set cookie
        //         $newCookie = cookie('city_id', $cityRequest->id);
        //         $city = City::with('child')->find($cityRequest->id);
        //     }
        // } else {
        //     if ($cityRequest) {
        //         // Set cookie
        //         $newCookie = cookie('city_id', $cityRequest->id);
        //         $city = $cityRequest->load('child');
        //     } else $city = $iran;
        // }

        // Set conditions if not Iran
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

        // TODO:ایا یک api دیگر زده شود برای ادمین؟ جهت جلوگیری از نمایش pending
        $conditions['state'] = 'accepted';
        // if (auth('api')->user()->isAdmin()) {
        //     if ($r->state) {
        //         $conditions['state'] = $r->state;
        //     }
        // }


        if ($categoryRequest) {
            $ids = (Category::extractChildrenIds($categoryRequest));
            $whereIns['category_id'] = $ids;
        }

        $query = Advert::query();

        // Add other conditions to the query
        $query->where($conditions);
        // Add WHERE IN whereIns for col1 and col2
        foreach ($whereIns as $column => $values) {
            $query->whereIn($column, $values);
        }
        // Include the 'user' relationship
        $query->with(['user', 'category']);

        // Order by 'id'
        if ($r->o == 'n' || $r->o == null) $query->orderBy('id', 'desc');
        if ($r->o == 'pa') $query->orderBy('price', 'asc');
        if ($r->o == 'pd') $query->orderBy('price', 'desc');

        // Paginate the results
        $perPage = $r->per_page ?? 10;
        $adverts = $query->paginate($perPage);

        // if ($newCookie)
        //     return response($adverts)->cookie($newCookie);
        return response($adverts);
    }

    public function show(AdvertShowRequest $r)
    {
        $advert = Advert::find($r->id_slug);
        if (!$advert)
            $advert = Advert::where(['slug_url' => $r->id_slug, 'state' => 'accepted'])->firstOrFail();
        event(new VisitAdvert($advert));
        $advert = $advert->load('user', 'category');
        return $advert;
    }

    public function showAdmin(AdvertAdminShowRequest $r)
    {
        $advert = Advert::find($r->id_slug);
        if (!$advert)
            $advert = Advert::where('slug_url', $r->id_slug)->firstOrFail();
        $advert = $advert->load('user', 'category', 'city');
        return $advert;
    }

    public static function uploadPhoto(AdvertUploadPhotoRequest $r)
    {
        // dd($r->all());
        try {
            $user = auth()->user();
            $data = [];
            foreach ($r->file('images') as $file) {
                $image = $file;
                $imageName = time() . bin2hex(random_bytes(5)) . '-image';
                Storage::disk('adverts')->put('/tmp/' . $imageName, $image->get());
                $data[] = $imageName;
            }
            if ($r->advert_id != null) {
                $advert = Advert::find($r->advert_id);
                $arr = $advert->images ? $advert->images : [];
                $arr = array_merge($arr, $data);
                $advert->update(['images' => $arr]);
            } else {
                $advert = $user->adverts()->create(['images' => $data]);
            }
            return response(['advert_id' => $advert->id], 200);
        } catch (Exception $e) {
            dd($e);
            return response(['message' => 'خطایی رخ داده است'], 500);
        }
    }

    public function create(AdvertCreateRequest $r)
    {
        try {
            DB::beginTransaction();
            $data = $r->validated();
            $user = auth()->user();
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
            $cat_title = Category::find($r->category_id)->title;
            $city = isset($r->city) ? $r->city : '';
            $slug_url = str_replace(' ', '-', env('APP_NAME') . ' ' . $city . ' ' . $r->title . ' ' . $cat_title . ' ' . bin2hex(random_bytes(4)));
            $slug = bin2hex(random_bytes(5));
            $data['slug'] = $slug;
            $data['slug_url'] = $slug_url;

            $advert = $user->adverts()->create($data);

            DB::commit();
            return response($advert, 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است'], 500);
        }
    }

    public function update(AdvertUpdateRequest $r)
    {
        try {
            DB::beginTransaction();
            $data = $r->validated();
            $cat_title = Category::find($r->category_id)->title;
            $city = isset($r->city) ? $r->city : '';
            $slug_url = str_replace(' ', '-', env('APP_NAME') . ' ' . $city . ' ' . $r->title . ' ' . $cat_title . ' ' . bin2hex(random_bytes(4)));
            $slug = bin2hex(random_bytes(5));
            $data['slug'] = $slug;
            $data['slug_url'] = $slug_url;
            $advert = tap($r->advert)->update($data);

            DB::commit();
            return response($advert, 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است'], 500);
        }
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
            'user_id' => auth('api')->id(),
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

    public static function recents(AdvertFavouriteRequest $r)
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

    public static function my(AdvertFavouriteRequest $r)
    {
        $user = auth()->user();
        return response($user->adverts);
    }
}
