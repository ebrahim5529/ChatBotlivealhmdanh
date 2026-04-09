<?php

namespace Database\Seeders;

use App\Models\PackageCategory;
use Illuminate\Database\Seeder;

class PackageCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'خصومات',
            'عروض خاصة',
            'باقات شهرية',
            'باقات سنوية',
            'عروض محدودة',
            'عروض الطلاب',
            'عروض المعلمين',
        ];

        foreach ($categories as $name) {
            PackageCategory::create(['name' => $name]);
        }
    }
}
