<?php

use App\Http\Controllers\Admin\BotResponseController;
use App\Http\Controllers\Admin\RolesController;
use App\Http\Controllers\Admin\Sales\MaterialController;
use App\Http\Controllers\Admin\Sales\PackageController;
use App\Http\Controllers\Admin\SiteInquiryController;
use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::prefix('sales')->name('sales.')->group(function () {
        Route::resource('packages', PackageController::class);
        Route::get('packages/{package}/images/{image}', [PackageController::class, 'image'])
            ->name('packages.image');
        Route::resource('materials', MaterialController::class)->except(['show']);
    });

    Route::resource('bot-responses', BotResponseController::class)->except(['show']);
    Route::resource('site-inquiries', SiteInquiryController::class)->except(['show']);
    Route::resource('users', UsersController::class)->except(['show']);
    Route::resource('roles', RolesController::class)->except(['show']);
});
