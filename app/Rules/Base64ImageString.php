<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Base64ImageString implements ValidationRule
{
    private const MAX_LENGTH = 15_728_640;

    /**
     * @param  Closure(string): void  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || $value === '') {
            $fail('قيمة الصورة غير صالحة.');

            return;
        }

        if (strlen($value) > self::MAX_LENGTH) {
            $fail('حجم سلسلة الصورة يتجاوز الحد المسموح.');

            return;
        }

        $payload = $value;
        if (str_starts_with($value, 'data:image/')) {
            $commaPosition = strpos($value, ',');
            if ($commaPosition === false) {
                $fail('تنسيق data URL للصورة غير صالح.');

                return;
            }
            $payload = substr($value, $commaPosition + 1);
        }

        if (base64_decode($payload, true) === false) {
            $fail('سلسلة Base64 غير صالحة.');
        }
    }
}
