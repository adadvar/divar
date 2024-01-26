<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryAnswerFormRequest;
use App\Http\Requests\Category\CategoryCreateAnswerRequest;
use App\Http\Requests\Category\CategoryCreateFormRequest;
use App\Http\Requests\Category\CategoryUpdateAnswerRequest;
use App\Models\CategoryAnswer;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FormController extends Controller
{
    public function createForm(CategoryCreateFormRequest $r)
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

    public function createAnswer(CategoryCreateAnswerRequest $r)
    {
        try {
            $user = auth()->user();
            $data = $r->validated();
            $data['user_id'] = $user->id;

            $form = $r->category->form()->where('published', true)->first();
            if ($form) {
                $answer = $form->answers()->create($data);
                return response($answer, 200);
            }
            return response(['message' => 'فرم موجود نمی باشد!'], 404);
        } catch (Exception $e) {
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است!'], 500);
        }
    }

    public function updateAnswer(CategoryUpdateAnswerRequest $r)
    {
        try {
            $user = auth()->user();
            $data = $r->validated();
            $data['user_id'] = $user->id;

            $form = $r->category->form()->where('published', true)->first();
            if ($form) {
                $answer = $form->answers()->updateOrCreate([], $data);
                return response($answer, 200);
            }
            return response(['message' => 'فرم موجود نمی باشد!'], 404);
        } catch (Exception $e) {
            Log::error($e);
            return response(['message' => 'خطایی رخ داده است!'], 500);
        }
    }

    public function getForm(Request $r)
    {
        $form = $r->category->form;
        $user = auth()->user();
        if (($user->isUser() && $form && $form->published) || ($user->isAdmin() && $form)) {
            return $form;
        }

        return [];
    }

    public function listAnswers(Request $r)
    {
        $query = CategoryAnswer::query();
        if ($r->q) {
            $query->where('name', 'LIKE', '%' . $r->q . '%');
        }
        if ($r->page)
            return $query->paginate($r->per_page ?? 10);
        return $query->get();
    }

    public function getAnswers(Request $r)
    {
        $form = $r->category->form;
        $user = auth()->user();
        if (($user->isUser() && $form && $form->published) || ($user->isAdmin() && $form)) {
            return $form->answers;
        }

        return [];
    }
}
