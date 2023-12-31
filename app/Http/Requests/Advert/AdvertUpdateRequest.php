<?php

namespace App\Http\Requests\Advert;

use Illuminate\Foundation\Http\FormRequest;

class AdvertUpdateRequest extends FormRequest
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
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:100',
            'info' => 'nullable|string',
            'province' => 'nullable|string',
            'city' => 'nullable|string',
            'lat' => 'nullable|string',
            'long' => 'nullable|string',
            'price' => 'nullable|numeric|gt:0',
        ];
    }
}
