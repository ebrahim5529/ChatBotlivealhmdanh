<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SalesPackage extends Model
{
    protected $fillable = [
        'offer_number',
        'category_id',
        'offer_type',
        'brand_name',
        'grade_level',
        'details',
        'start_date',
        'end_date',
        'location_link',
        'location_description',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(MaterialCategory::class, 'category_id');
    }
}
