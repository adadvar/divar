<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class CategoryUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Gate::allows('update-category', $this->category);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'parent_id' => 'nullable|exists:categories,id',
            'title' => 'nullable|string|max:100',
            'slug' => 'nullable|string|max:100',
            'xml' => 'nullable|string',
            'json' => 'nullable|string',
            'html' => 'nullable|string',
            'icon' => 'nullable|string|max:100',
            'banner' => 'nullable|string|max:100',
        ];
    }
}
