<?php

namespace Database\Seeders;

use App\Models\MaterialCategory;
use Illuminate\Database\Seeder;

class MaterialCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'اسم التصنيف',
            'مواد غير مسجلة',
            'ملخصات',
            'اختبارات',
            'دورات تدريبية',
            'كتب دراسية',
            'مراجعات نهائية',
        ];

        foreach ($categories as $name) {
            MaterialCategory::create(['name' => $name]);
        }
    }
}
