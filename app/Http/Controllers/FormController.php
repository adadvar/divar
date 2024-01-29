<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryAnswerCreateRequest;
use App\Http\Requests\Category\CategoryCreateFormRequest;
use App\Http\Requests\Category\CategoryListAdminAnswerRequest;
use App\Models\CategoryAnswer;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

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

    public function createAnswer(CategoryAnswerCreateRequest $r)
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
            $slug_url = str_replace(' ', '-', env('APP_NAME') . ' ' . $city .  ' ' . $cat_title . ' ' . bin2hex(random_bytes(4)));
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
            $answers = $r->category->form->answers()->paginate($r->per_page ?? 10);
            return  response(['form' => $form, 'answers' => $answers], 200);
        }
    }

    public function listAnswers(Request $r)
    {
        $user = auth()->user();
        return CategoryAnswer::where('user_id', $user->id)->get();
    }
}
