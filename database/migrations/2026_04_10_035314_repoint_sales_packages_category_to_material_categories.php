<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * ربط تصنيف العرض بجدول تصنيفات  (نفس إدارة /admin/sales/materials).
     */
    public function up(): void
    {
        Schema::table('sales_packages', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
        });

        // القيم القديمة كانت تشير إلى package_categories وليست material_categories
        DB::table('sales_packages')->update(['category_id' => null]);

        Schema::table('sales_packages', function (Blueprint $table) {
            $table->foreign('category_id')
                ->references('id')
                ->on('material_categories')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('sales_packages', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
        });

        DB::table('sales_packages')->update(['category_id' => null]);

        Schema::table('sales_packages', function (Blueprint $table) {
            $table->foreign('category_id')
                ->references('id')
                ->on('package_categories')
                ->nullOnDelete();
        });
    }
};
