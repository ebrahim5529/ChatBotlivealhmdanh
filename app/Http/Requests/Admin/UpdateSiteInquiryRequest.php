<?php

namespace App\Http\Requests\Admin;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSiteInquiryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'site_name' => ['required', 'string', 'max:255'],
            'mobile_number' => ['required', 'string', 'regex:/^05\d{8}$/'],
            'site_url' => ['required', 'url', 'max:2048'],
            'site_description' => ['nullable', 'string', 'max:5000'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'site_name.required' => 'اسم الموقع مطلوب.',
            'mobile_number.required' => 'رقم الجوال مطلوب.',
            'mobile_number.regex' => 'رقم الجوال يجب أن يكون بصيغة سعودي (مثال: 05xxxxxxxx).',
            'site_url.required' => 'رابط الموقع مطلوب.',
            'site_url.url' => 'رابط الموقع غير صالح.',
        ];
    }
}
