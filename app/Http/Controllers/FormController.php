<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryAnswerFormRequest;
use App\Http\Requests\Category\CategoryCreateAnswerRequest;
use App\Http\Requests\Category\CategoryCreateFormRequest;
use App\Http\Requests\Category\CategoryListAdminAnswerRequest;
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

    public function createAnswer(Request $r)
    {
        try {
            $user = auth()->user();
            $data = $r->all();
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

    public function updateAnswer(Request $r)
    {
        $user = auth()->user();
        $answer = CategoryAnswer::find($r->id);
        if ($user->isAdmin() || $answer->user_id == $user->id) {

            try {

                $data = $r->all();
                $data['user_id'] = $user->id;

                tap($answer)->update($data);
                return response($answer, 200);
            } catch (Exception $e) {
                Log::error($e);
                return response(['message' => 'خطایی رخ داده است!'], 500);
            }
        }
        return response([], 401);
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

    public function listAdminAnswers(CategoryListAdminAnswerRequest $r)
    {
        $user = auth()->user();
        $form = $r->category->form;
        if ($form) {
            $answers = $r->category->form->answers()->paginate(10);
            return  response(['form' => $form, 'answers' => $answers], 200);
        }
    }

    public function listAnswers(Request $r)
    {
        $user = auth()->user();
        return CategoryAnswer::where('user_id', $user->id)->get();
    }
}
