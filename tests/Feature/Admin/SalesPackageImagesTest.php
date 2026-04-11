<?php

use App\Models\MaterialCategory;
use App\Models\SalesPackage;
use App\Models\User;

/** 1×1 PNG كـ data URL */
const TINY_PNG_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

test('storing a package persists images_base64 and look_location_link', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $category = MaterialCategory::query()->create(['name' => 'تصنيف']);

    $second = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAwUBAScYX0UAAAAASUVORK5CYII=';

    $response = $this->post(route('admin.sales.packages.store'), [
        'category_id' => $category->id,
        'offer_number' => 'OFF-B64-1',
        'details' => 'تفاصيل',
        'look_location_link' => 'https://maps.example.com/?q=1',
        'images_base64' => [TINY_PNG_DATA_URL, $second],
    ]);

    $response->assertRedirect(route('admin.sales.packages.index'));

    $package = SalesPackage::query()->where('offer_number', 'OFF-B64-1')->first();

    expect($package)->not->toBeNull();
    expect($package->look_location_link)->toBe('https://maps.example.com/?q=1');
    expect($package->images_base64)->toBeArray()->toHaveCount(2);
    expect($package->images_base64[0])->toStartWith('data:image/png;base64,');
});

test('updating a package replaces images_base64', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $category = MaterialCategory::query()->create(['name' => 'تصنيف']);

    $package = SalesPackage::query()->create([
        'category_id' => $category->id,
        'offer_number' => 'X',
        'offer_type' => 'نوع',
        'brand_name' => 'براند',
        'grade_level' => 'ثالث',
        'details' => 'تفاصيل',
        'start_date' => now()->toDateString(),
        'end_date' => now()->addMonth()->toDateString(),
        'images_base64' => [TINY_PNG_DATA_URL],
    ]);

    $replacement = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAwUBAScYX0UAAAAASUVORK5CYII=';

    $this->put(route('admin.sales.packages.update', $package), [
        'offer_number' => 'X',
        'category_id' => $category->id,
        'images_base64' => [$replacement],
    ]);

    $package->refresh();

    expect($package->images_base64)->toBeArray()->toHaveCount(1);
    expect($package->images_base64[0])->toBe($replacement);
});
