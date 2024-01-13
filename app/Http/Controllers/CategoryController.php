<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryCreateRequest;
use App\Http\Requests\Category\CategoryDeleteRequest;
use App\Http\Requests\Category\CategoryListRequest;
use App\Http\Requests\Category\CategoryShowRequest;
use App\Http\Requests\Category\CategoryUpdateRequest;
use App\Models\Category;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class CategoryController extends Controller
{
    public function list(CategoryListRequest $r)
    {
        $categories = Category::where('parent_id', null)->with('child')->get();
        return $categories;
    }

    public function listAdmin(CategoryListRequest $r)
    {
        $query = Category::query();
        if ($r->q) {
            $query->where('name', 'LIKE', '%' . $r->q . '%');
        }
        $query->where('parent_id', null)->with('child')->get();
        return $query->paginate($r->per_page ?? 10);
    }

    public function show(CategoryShowRequest $r)
    {
        $city = $r->city;
        $cookie = cookie('city', $city);
        $conditions = [];
        $conditions['city'] = $city;
        if ($r->price) {
            $prices = explode('-', $r->price);
            if ($prices[0]) $conditions[] = ['price', '>=', $prices[0]];
            if ($prices[1]) $conditions[] = ['price', '<=', $prices[1]];
        }
        $conditions['state'] = 'accepted';

        $category = $r->category->load(['adverts' => fn ($q) => $q->where($conditions), 'child', 'child.adverts' => fn ($q) => $q->where($conditions)]);
        return response(compact('category'))->cookie($cookie);
    }

    public function menu(CategoryListRequest $r)
    {
        $categories = Category::where('parent_id', null)->with('child')->get();
        return $categories;
    }

    public function create(CategoryCreateRequest $r)
    {
        try {
            DB::beginTransaction();
            $data = $r->validated();
            $user = auth()->user();
            $category = $user->categories()->create($data);

            DB::commit();
            return response($category, 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است'], 500);
        }
    }

    public function update(CategoryUpdateRequest $r)
    {
        try {
            DB::beginTransaction();
            $data = $r->validated();
            $category = Category::find($r->id);
            $category = tap($category)->update($data);

            DB::commit();
            return response($category, 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است'], 500);
        }
    }

    public function delete(CategoryDeleteRequest $r)
    {
        try {
            DB::beginTransaction();
            Category::find($r->id)->delete();
            DB::commit();
            return response(['message' => 'با موفقیت حذف شد!'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است !'], 500);
        }
    }
}
