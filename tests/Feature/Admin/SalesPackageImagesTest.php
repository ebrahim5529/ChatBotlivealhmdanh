<?php

use App\Models\MaterialCategory;
use App\Models\SalesPackage;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('storing a package persists image_paths and look_location_link', function () {
    Storage::fake('local');

    $user = User::factory()->create();
    $this->actingAs($user);

    $category = MaterialCategory::query()->create(['name' => 'تصنيف']);

    $response = $this->post(route('admin.sales.packages.store'), [
        'category_id' => $category->id,
        'offer_number' => 'OFF-B64-1',
        'details' => 'تفاصيل',
        'look_location_link' => 'https://maps.example.com/?q=1',
        'images' => [
            UploadedFile::fake()->image('a.png'),
            UploadedFile::fake()->image('b.png'),
        ],
    ]);

    $response->assertRedirect(route('admin.sales.packages.index'));

    $package = SalesPackage::query()->where('offer_number', 'OFF-B64-1')->first();

    expect($package)->not->toBeNull();
    expect($package->look_location_link)->toBe('https://maps.example.com/?q=1');
    expect($package->image_paths)->toBeArray()->toHaveCount(2);
    expect($package->image_paths[0])->toStartWith("private/admin/sales/packages/{$package->id}/");

    Storage::disk('local')->assertExists($package->image_paths[0]);
});

test('updating a package replaces image_paths', function () {
    Storage::fake('local');

    $user = User::factory()->create();
    $this->actingAs($user);

    $category = MaterialCategory::query()->create(['name' => 'تصنيف']);

    $package = SalesPackage::query()->create([
        'category_id' => $category->id,
        'user_id' => $user->id,
        'offer_number' => 'X',
        'offer_type' => 'نوع',
        'brand_name' => 'براند',
        'grade_level' => 'ثالث',
        'details' => 'تفاصيل',
        'start_date' => now()->toDateString(),
        'end_date' => now()->addMonth()->toDateString(),
        'image_paths' => ['private/admin/sales/packages/1/old.png'],
    ]);

    $oldPath = "private/admin/sales/packages/{$package->id}/old.png";
    $package->update(['image_paths' => [$oldPath]]);
    Storage::disk('local')->put($oldPath, 'old');

    $this->put(route('admin.sales.packages.update', $package), [
        'offer_number' => 'X',
        'category_id' => $category->id,
        'retained_image_paths' => [],
        'images' => [
            UploadedFile::fake()->image('new.png'),
        ],
    ]);

    $package->refresh();

    expect($package->image_paths)->toBeArray()->toHaveCount(1);
    expect($package->image_paths[0])->toStartWith("private/admin/sales/packages/{$package->id}/");
    Storage::disk('local')->assertMissing($oldPath);
});
