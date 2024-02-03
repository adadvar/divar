<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryAnswer\CategoryAnswerCreateRequest;
use App\Http\Requests\CategoryAnswer\CategoryAnswerUpdateRequest;
use App\Http\Requests\CategoryAnswer\CategoryListAdminAnswerRequest;
use App\Models\Category;
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
            $category = $r->category;
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
            $cat_title = $category->title;
            $city = City::find($r->city_id);
            $slug_url = str_replace(' ', '-', env('APP_NAME') . ' ' . $city->name . ' ' . $r->title . ' ' . $cat_title . ' ' . bin2hex(random_bytes(4)));
            $slug = bin2hex(random_bytes(5));
            $data['slug'] = $slug;
            $data['slug_url'] = $slug_url;
            $form = $category->form()->where('published', true)->first();
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
            $category = $answer->category;
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
            $answers = $r->category->form->answers()->with(['category', 'city'])->paginate($r->per_page ?? 10);
            return response(['form' => $form, 'answers' => $answers], 200);
        } else {
            return response(['error' => 'Form not found'], 404);
        }
    }

    public function listUser(Request $r)
    {
        $user = auth()->user();
        return CategoryAnswer::where('user_id', $user->id)->get();
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

        $query = CategoryAnswer::query();

        $query->where($conditions);
        foreach ($whereIns as $column => $values) {
            $query->whereIn($column, $values);
        }

        $query->with(['user', 'category']);

        if ($r->o == 'n' || $r->o == null) $query->orderBy('id', 'desc');
        if ($r->o == 'pa') $query->orderBy('price', 'asc');
        if ($r->o == 'pd') $query->orderBy('price', 'desc');

        $perPage = $r->per_page ?? 10;
        $answers = $query->paginate($perPage);

        return response($answers);
    }
}
