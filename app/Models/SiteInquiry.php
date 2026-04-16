<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteInquiry extends Model
{
    protected $fillable = [
        'site_name',
        'mobile_number',
        'site_url',
        'site_description',
    ];
}
