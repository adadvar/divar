<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryAnswer\CategoryAnswerCreateRequest;
use App\Http\Requests\CategoryAnswer\CategoryAnswerUpdateRequest;
use App\Http\Requests\CategoryAnswer\CategoryListAdminAnswerRequest;
use App\Models\CategoryAnswer;
use App\Models\City;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CategoryAnswerController extends Controller
{
    public function create(CategoryAnswerCreateRequest $r)
    {
        try {
            $user = auth()->user();
            $data = $r->validated();
            $data['user_id'] = $user->id;
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
            $cat_title = $r->category->title;
            $city = isset($r->city) ? $r->city : '';
            $slug_url = str_replace(' ', '-', env('APP_NAME') . ' ' . $city . ' ' . $r->title . ' ' . $cat_title . ' ' . bin2hex(random_bytes(4)));
            $slug = bin2hex(random_bytes(5));
            $data['slug'] = $slug;
            $data['slug_url'] = $slug_url;

            $form = $r->category->form()->where('published', true)->first();
            if ($form) {
                $answer = $form->answers()->create($data);
                return response($answer, 200);
            }
            return response(['message' => 'فرم موجود نمی باشد!'], 404);
        } catch (Exception $e) {

            Log::error($e->getTraceAsString());
            return response(['message' => 'خطایی رخ داده است!'], 500);
        }
    }

    public function update(CategoryAnswerUpdateRequest $r)
    {

        try {
            $user = auth()->user();
            $answer = $r->categoryAnswer;
            $data = $r->validated();
            $data['user_id'] = $user->id;

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
                $cat_title = $r->category->title;
                $city = City::find($r->city_id);
                $slug_url = str_replace(' ', '-', env('APP_NAME') . ' ' . $city . ' ' . $r->title . ' ' . $cat_title . ' ' . bin2hex(random_bytes(4)));
                $slug = bin2hex(random_bytes(5));
                $data['slug'] = $slug;
                $data['slug_url'] = $slug_url;
            }


            tap($answer)->update($data);
            return response($answer, 200);
        } catch (Exception $e) {
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است!'], 500);
        }
    }

    public function listAdmin(CategoryListAdminAnswerRequest $r)
    {
        $user = auth()->user();
        $form = $r->category->form;
        if ($form) {
            $answers = $r->category->form->answers()->paginate($r->per_page ?? 10);
            return  response(['form' => $form, 'answers' => $answers], 200);
        }
    }

    public function list(Request $r)
    {
        $user = auth()->user();
        return CategoryAnswer::where('user_id', $user->id)->get();
    }
}
