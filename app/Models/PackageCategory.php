<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PackageCategory extends Model
{
    protected $fillable = ['name'];

    public function packages(): HasMany
    {
        return $this->hasMany(SalesPackage::class, 'category_id');
    }
}
