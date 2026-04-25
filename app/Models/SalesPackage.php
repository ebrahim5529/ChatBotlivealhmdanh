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
        'look_location_link',
        'images_base64',
        'image_paths',
        'user_id',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'images_base64' => 'array',
        'image_paths' => 'array',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(MaterialCategory::class, 'category_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
