<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryCreateFormRequest;
use App\Http\Requests\Category\CategoryCreateRequest;
use App\Http\Requests\Category\CategoryDeleteRequest;
use App\Http\Requests\Category\CategoryListRequest;
use App\Http\Requests\Category\CategoryShowRequest;
use App\Http\Requests\Category\CategoryUpdateRequest;
use App\Models\Category;
use App\Models\CategoryForm;
use Exception;
use Illuminate\Http\Request;
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
        $query = $r->category->child();

        if ($r->q) {
            $query->where('title', 'LIKE', '%' . $r->q . '%');
        }

        return $query->paginate($r->per_page ?? 10);
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

    public function createForm(CategoryCreateFormRequest $r)
    {
        try {
            // DB::beginTransaction();

            $user = auth()->user();
            $data = $r->validated();
            $data['category_id'] = $r->category->id;

            $categoryForm = $user->forms()->updateOrCreate(
                ['user_id' => $user->id, 'category_id' => $r->category->id],
                $data
            );

            // DB::commit();

            return response($categoryForm, 200);
        } catch (Exception $e) {
            // DB::rollBack();
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است!'], 500);
        }
    }

    public function getForm(Request $r)
    {
        $form = $r->category->form;
        if ($form) return $form->content;
        // return [];
    }
}
