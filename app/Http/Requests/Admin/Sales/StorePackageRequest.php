<?php

namespace App\Http\Requests\Admin\Sales;

use App\Rules\Base64ImageString;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StorePackageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'offer_number' => ['nullable', 'string', 'max:255'],
            'category_id' => ['nullable', 'exists:material_categories,id'],
            'offer_type' => ['nullable', 'string', 'max:255'],
            'brand_name' => ['nullable', 'string', 'max:255'],
            'grade_level' => ['nullable', 'string', 'max:255'],
            'details' => ['nullable', 'string'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'location_link' => ['nullable', 'string', 'max:255'],
            'location_description' => ['nullable', 'string'],
            'look_location_link' => ['nullable', 'string', 'max:65535'],
            'images_base64' => ['nullable', 'array', 'max:20'],
            'images_base64.*' => ['required', 'string', new Base64ImageString],
        ];
    }

    protected function prepareForValidation(): void
    {
        if (! $this->has('images_base64')) {
            return;
        }

        $raw = $this->input('images_base64');
        if (! is_array($raw)) {
            return;
        }

        $filtered = array_values(array_filter(
            $raw,
            static fn ($v): bool => is_string($v) && $v !== ''
        ));

        $this->merge(['images_base64' => $filtered]);
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'grade_level.required' => 'الصف الدراسي مطلوب.',
        ];
    }
}
