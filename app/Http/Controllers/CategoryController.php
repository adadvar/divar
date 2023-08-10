<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\DeleteCategoryRequest;
use App\Http\Requests\Category\ListCategoryRequest;
use App\Http\Requests\Category\ShowCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    public function list(ListCategoryRequest $r)
    {
        $categories = Category::all();
        return $categories;
    }

    public function show(ShowCategoryRequest $r)
    {
        $category = $r->category->load('adverts');
        return $category;
    }

    public function create(CreateCategoryRequest $r)
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

    public function update(UpdateCategoryRequest $r)
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

    public function delete(DeleteCategoryRequest $r)
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
