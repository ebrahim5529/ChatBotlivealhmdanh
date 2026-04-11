<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'permission_role');
    }

    public function hasPermission(string $menuKey, string $action): bool
    {
        return $this->permissions()
            ->where('menu_key', $menuKey)
            ->where('action', $action)
            ->exists();
    }
}
