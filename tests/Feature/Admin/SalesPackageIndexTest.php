<?php

use App\Models\MaterialCategory;
use App\Models\SalesPackage;
use App\Models\User;

test('guests are redirected from admin packages index', function () {
    $response = $this->get(route('admin.sales.packages.index'));

    $response->assertRedirect(route('login'));
});

test('authenticated users can view packages index', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('admin.sales.packages.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('sales/packages/index'));
});

test('packages index exposes search and category filters from query string', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $category = MaterialCategory::query()->create(['name' => 'تصنيف تجريبي']);

    $response = $this->get(route('admin.sales.packages.index', [
        'search' => 'عرض',
        'category_id' => (string) $category->id,
    ]));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('filters', fn ($f) => $f
            ->where('search', 'عرض')
            ->where('category_id', (string) $category->id)
        )
    );
});

test('packages index filters packages by search', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $category = MaterialCategory::query()->create(['name' => 'خصومات']);

    SalesPackage::query()->create([
        'category_id' => $category->id,
        'offer_number' => 'A-100',
        'offer_type' => 'نوع',
        'brand_name' => 'براند',
        'grade_level' => 'ثالث',
        'details' => 'تفاصيل',
        'start_date' => now()->toDateString(),
        'end_date' => now()->addMonth()->toDateString(),
    ]);

    SalesPackage::query()->create([
        'category_id' => $category->id,
        'offer_number' => 'B-200',
        'offer_type' => 'نوع',
        'brand_name' => 'آخر',
        'grade_level' => 'رابع',
        'details' => 'نص',
        'start_date' => now()->toDateString(),
        'end_date' => now()->addMonth()->toDateString(),
    ]);

    $response = $this->get(route('admin.sales.packages.index', [
        'search' => 'B-200',
    ]));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->has('packages.data', 1)
        ->where('packages.data.0.offer_number', 'B-200')
    );
});
