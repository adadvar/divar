<?php

namespace App\Http\Requests\CategoryAnswer;

use App\Rules\CanChangeAdvertState;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class CategoryAnswerChangeStateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('change-state', $this->categoryAnswer);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'state' => ['required', new CanChangeAdvertState($this->advert)]
        ];
    }
}
