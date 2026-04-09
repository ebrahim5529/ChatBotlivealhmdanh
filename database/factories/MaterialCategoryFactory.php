<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MaterialCategory>
 */
class MaterialCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['اسم التصنيف', 'مواد غير مسجلة', 'ملخصات', 'اختبارات', 'دورات تدريبية']),
        ];
    }
}
