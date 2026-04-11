<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuItems = [
            'packages',
            'materials',
            'bot-responses',
            'users',
            'roles',
        ];

        $actions = ['create', 'read', 'update', 'delete'];

        foreach ($menuItems as $menuKey) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(
                    ['menu_key' => $menuKey, 'action' => $action],
                    ['menu_key' => $menuKey, 'action' => $action]
                );
            }
        }
    }
}
