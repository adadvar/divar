<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

class CategoryUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
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
