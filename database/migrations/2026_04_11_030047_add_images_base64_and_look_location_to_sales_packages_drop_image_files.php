<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('sales_package_images');

        Schema::table('sales_packages', function (Blueprint $table) {
            $table->json('images_base64')->nullable()->after('location_description');
            $table->text('look_location_link')->nullable()->after('images_base64');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_packages', function (Blueprint $table) {
            $table->dropColumn(['images_base64', 'look_location_link']);
        });

        Schema::create('sales_package_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sales_package_id')->constrained('sales_packages')->cascadeOnDelete();
            $table->string('path');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }
};
