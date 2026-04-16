<?php

use App\Models\SiteInquiry;
use App\Models\User;

test('guests are redirected from admin site inquiries index', function () {
    $response = $this->get(route('admin.site-inquiries.index'));

    $response->assertRedirect(route('login'));
});

test('authenticated users can view site inquiries index', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('admin.site-inquiries.index'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('site-inquiries/index'));
});

test('authenticated users can create a site inquiry', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $payload = [
        'site_name' => 'موقع تجريبي',
        'mobile_number' => '0500000000',
        'site_url' => 'https://example.com',
        'site_description' => 'وصف مختصر',
    ];

    $response = $this->post(route('admin.site-inquiries.store'), $payload);

    $response->assertRedirect(route('admin.site-inquiries.index'));
    $this->assertDatabaseHas('site_inquiries', [
        'site_name' => 'موقع تجريبي',
        'mobile_number' => '0500000000',
        'site_url' => 'https://example.com',
    ]);
});

test('authenticated users can update a site inquiry', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $inquiry = SiteInquiry::query()->create([
        'site_name' => 'قديم',
        'mobile_number' => '0500000000',
        'site_url' => 'https://example.com',
        'site_description' => null,
    ]);

    $response = $this->put(route('admin.site-inquiries.update', $inquiry), [
        'site_name' => 'جديد',
        'mobile_number' => '0511111111',
        'site_url' => 'https://example.org',
        'site_description' => 'تم التحديث',
    ]);

    $response->assertRedirect(route('admin.site-inquiries.index'));
    $this->assertDatabaseHas('site_inquiries', [
        'id' => $inquiry->id,
        'site_name' => 'جديد',
        'mobile_number' => '0511111111',
        'site_url' => 'https://example.org',
    ]);
});

test('authenticated users can delete a site inquiry', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $inquiry = SiteInquiry::query()->create([
        'site_name' => 'موقع للحذف',
        'mobile_number' => '0500000000',
        'site_url' => 'https://example.com',
        'site_description' => null,
    ]);

    $response = $this->delete(route('admin.site-inquiries.destroy', $inquiry));

    $response->assertRedirect(route('admin.site-inquiries.index'));
    $this->assertDatabaseMissing('site_inquiries', [
        'id' => $inquiry->id,
    ]);
});
