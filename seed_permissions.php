<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use Illuminate\Support\Facades\DB;

$menuItems = ['packages', 'materials', 'bot-responses', 'users', 'roles'];
$actions = ['create', 'read', 'update', 'delete'];

foreach ($menuItems as $menuKey) {
    foreach ($actions as $action) {
        DB::table('permissions')->insertOrIgnore([
            'menu_key' => $menuKey,
            'action' => $action,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}

echo "Permissions seeded successfully!\n";
