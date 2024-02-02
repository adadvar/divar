<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryCreateFormRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryFormController extends Controller
{
    public function create(CategoryCreateFormRequest $r)
    {
        try {
            $user = auth()->user();
            $data = $r->validated();
            $data['category_id'] = $r->category->id;

            $categoryForm = $user->forms()->updateOrCreate(
                ['category_id' => $r->category->id],
                $data
            );
            return response($categoryForm, 200);
        } catch (Exception $e) {
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است!'], 500);
        }
    }

    public function show(Request $r)
    {
        $form = $r->category->form;
        $user = auth()->user();
        if (($user->isUser() && $form && $form->published) || ($user->isAdmin() && $form)) {
            return $form;
        }

        return [];
    }
}
