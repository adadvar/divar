<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryCreateRequest;
use App\Http\Requests\Category\CategoryDeleteRequest;
use App\Http\Requests\Category\CategoryListRequest;
use App\Http\Requests\Category\CategoryShowRequest;
use App\Http\Requests\Category\CategoryUpdateRequest;
use App\Models\Category;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function list(CategoryListRequest $r)
    {
        $categories = Category::all();
        return $categories;
    }

    public function show(CategoryShowRequest $r)
    {
        $category = $r->category->load('adverts');
        return $category;
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
