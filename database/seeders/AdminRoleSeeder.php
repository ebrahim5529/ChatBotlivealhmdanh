<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class AdminRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate([
            'name' => 'مدير النظام',
        ]);

        $menuKeys = [
            'dashboard',
            'users',
            'roles',
            'permissions',
            'materials',
            'material_categories',
            'packages',
            'package_categories',
            'sales_packages',
            'bot_responses',
            'settings',
        ];

        $actions = ['create', 'read', 'update', 'delete'];

        $permissionIds = [];

        foreach ($menuKeys as $menuKey) {
            foreach ($actions as $action) {
                $permission = Permission::firstOrCreate([
                    'menu_key' => $menuKey,
                    'action' => $action,
                ]);
                $permissionIds[] = $permission->id;
            }
        }

        $adminRole->permissions()->sync($permissionIds);
    }
}
