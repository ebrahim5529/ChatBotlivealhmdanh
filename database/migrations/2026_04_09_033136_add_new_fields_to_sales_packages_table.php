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
        Schema::table('sales_packages', function (Blueprint $table) {
            if (!Schema::hasColumn('sales_packages', 'offer_number')) {
                $table->string('offer_number')->nullable()->after('id');
            }
            if (!Schema::hasColumn('sales_packages', 'category_id')) {
                $table->unsignedBigInteger('category_id')->nullable()->after('offer_number');
            }
            if (!Schema::hasColumn('sales_packages', 'offer_type')) {
                $table->string('offer_type')->nullable()->after('category_id');
            }
            if (!Schema::hasColumn('sales_packages', 'brand_name')) {
                $table->string('brand_name')->nullable()->after('offer_type');
            }
            if (!Schema::hasColumn('sales_packages', 'start_date')) {
                $table->date('start_date')->nullable()->after('details');
            }
            if (!Schema::hasColumn('sales_packages', 'end_date')) {
                $table->date('end_date')->nullable()->after('start_date');
            }
            if (!Schema::hasColumn('sales_packages', 'location_link')) {
                $table->string('location_link')->nullable()->after('end_date');
            }
            if (!Schema::hasColumn('sales_packages', 'location_description')) {
                $table->text('location_description')->nullable()->after('location_link');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_packages', function (Blueprint $table) {
            $table->dropColumn([
                'offer_number',
                'category_id',
                'offer_type',
                'brand_name',
                'start_date',
                'end_date',
                'location_link',
                'location_description',
            ]);
        });
    }
};
