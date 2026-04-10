<?php

use App\Http\Controllers\Admin\BotResponseController;
use App\Http\Controllers\Admin\RolesController;
use App\Http\Controllers\Admin\Sales\MaterialController;
use App\Http\Controllers\Admin\Sales\PackageController;
use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::prefix('sales')->name('sales.')->group(function () {
        Route::resource('packages', PackageController::class)->except(['show']);
        Route::resource('materials', MaterialController::class)->except(['show']);
    });

    Route::resource('bot-responses', BotResponseController::class)->except(['show']);
    Route::resource('users', UsersController::class)->except(['show']);
    Route::resource('roles', RolesController::class)->except(['show']);
});
