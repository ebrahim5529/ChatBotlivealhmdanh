<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sales_packages', function (Blueprint $table) {
            $table->json('image_paths')->nullable()->after('images_base64');
        });
    }

    public function down(): void
    {
        Schema::table('sales_packages', function (Blueprint $table) {
            $table->dropColumn('image_paths');
        });
    }
};
