<?php

namespace App\Http\Controllers;

use App\Events\VisitAdvert;
use App\Http\Requests\Advert\ChangeStateAdvertRequest;
use App\Http\Requests\Advert\CreateAdvertRequest;
use App\Http\Requests\Advert\DeleteAdvertRequest;
use App\Http\Requests\Advert\FavouriteAdvertRequest;
use App\Http\Requests\Advert\LikeAdvertRequest;
use App\Http\Requests\Advert\ListAdvertRequest;
use App\Http\Requests\Advert\ShowAdvertRequest;
use App\Http\Requests\Advert\UnlikeAdvertRequest;
use App\Http\Requests\Advert\UpdateAdvertRequest;
use App\Http\Requests\Advert\UploadAdvertPhotoRequest;
use App\Models\Advert;
use App\Models\AdvertFavourite;
use App\Models\AdvertRecent;
use App\Models\Category;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AdvertController extends Controller
{
    public function list(ListAdvertRequest $r)
    {
        $adverts = Advert::with('user')->orderBy('id')->paginate($r->per_page ?? 10)->all();
        return $adverts;
    }

    public function show(ShowAdvertRequest $r)
    {
        event(new VisitAdvert($r->advert));
        $advert = $r->advert->load('user','category');
        return $advert;
    }

    public static function uploadPhoto(UploadAdvertPhotoRequest $r)
    {
        // dd($r->all());
        try {
            $user = auth()->user();
            $data =[];
            foreach ($r->file('images') as $file) {
                $image = $file;
                $imageName = time() . bin2hex(random_bytes(5)) . '-image';
                Storage::disk('adverts')->put('/tmp/' . $imageName, $image->get());
                $data[] = $imageName;
            }
            if($r->advert_id!='null'){
                $advert = Advert::find($r->advert_id);
                $arr = $advert->images?$advert->images:[];
                $arr = array_merge($arr, $data);
                $advert->update(['images' => $arr]);
            }else{
                $advert = $user->adverts()->create(['images' => $data]);
            }
            return response(['advert_id'=> $advert->id], 200);
        } catch (Exception $e) {
            dd($e);
            return response(['message' => 'خطایی رخ داده است'], 500);
        }
    }

    public function create(CreateAdvertRequest $r)
    {
        // dd($r->advert_id!=null?true:false);
        try {
            DB::beginTransaction();
            $data = $r->validated();
            $user = auth()->user();
            $cat_title = Category::find($r->category_id)->title;
            $city = isset($r->city) ? $r->city : '';
            $slug_url = str_replace(' ','-',env('APP_NAME').' '.$city.' '.$r->title.' '.$cat_title.' '.bin2hex(random_bytes(4)));
            $slug = bin2hex(random_bytes(5));
            $data['slug'] = $slug;
            $data['slug_url'] = $slug_url;
            if($r->advert_id!=null){
                $advert = Advert::find($r->advert_id);
                $advert->update($data);
            }else{
                $advert = $user->adverts()->create($data);
            }
            $advert->advert_id = 'null';

            DB::commit();
            return response($advert, 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است'], 500);
        }
    }

    public function update(UpdateAdvertRequest $r)
    {
        try {
            DB::beginTransaction();
            $data = $r->validated();
            $cat_title = Category::find($r->category_id)->title;
            $city = isset($r->city) ? $r->city : '';
            $slug_url = str_replace(' ','-',env('APP_NAME').' '.$city.' '.$r->title.' '.$cat_title.' '.bin2hex(random_bytes(4)));
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

    public static function changeState(ChangeStateAdvertRequest $r)
    {
        $advert = $r->advert;
        $advert->state = $r->state;
        $advert->save();

        return response($advert);
    }

    public function delete(DeleteAdvertRequest $r)
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

    public static function like(LikeAdvertRequest $r)
    {
        //ابتدا باید وضعیت advert به accepted تغییر کند
        AdvertFavourite::create([
            'user_id' => auth('api')->id(),
            'user_ip' => client_ip(),
            'advert_id' => $r->advert->id,
        ]);

        return response(['message' => 'با موفقیت ثبت شد'], 200);
    }

    public static function unlike(UnlikeAdvertRequest $r)
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

    public static function favourites(FavouriteAdvertRequest $r){
        $user = auth()->user();
        return response($user->favouriteAdverts);
        
    }

    public static function recents(FavouriteAdvertRequest $r){
        $user = auth()->user();
        return response($user->recentAdverts);
        
    }
}
