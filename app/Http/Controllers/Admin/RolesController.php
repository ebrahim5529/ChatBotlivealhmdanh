<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRoleRequest;
use App\Http\Requests\Admin\UpdateRoleRequest;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RolesController extends Controller
{
    public function index(): Response
    {
        $roles = Role::query()
            ->withCount('users')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('roles/index', [
            'roles' => $roles,
        ]);
    }

    public function create(): Response
    {
        $permissions = $this->getGroupedPermissions();

        return Inertia::render('roles/create', [
            'permissions' => $permissions,
        ]);
    }

    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $role = Role::create($request->validated());

        if ($request->has('permissions')) {
            $role->permissions()->sync($request->input('permissions', []));
        }

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'تم إضافة الدور بنجاح');
    }

    public function edit(Role $role): Response
    {
        $role->load('permissions');
        $permissions = $this->getGroupedPermissions();

        return Inertia::render('roles/edit', [
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $role->permissions->pluck('id')->toArray(),
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        $role->update($request->validated());

        if ($request->has('permissions')) {
            $role->permissions()->sync($request->input('permissions', []));
        }

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'تم تحديث الدور بنجاح');
    }

    public function destroy(Role $role): RedirectResponse
    {
        $role->delete();

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'تم حذف الدور بنجاح');
    }

    private function getGroupedPermissions(): array
    {
        $menuLabels = [
            'packages' => 'العروض',
            'materials' => 'التصنيفات',
            'bot-responses' => 'ردود الشتات',
            'users' => 'المستخدمين',
            'roles' => 'الأدوار والصلاحيات',
        ];

        $actionLabels = [
            'create' => 'إضافة',
            'read' => 'عرض',
            'update' => 'تعديل',
            'delete' => 'حذف',
        ];

        return Permission::all()
            ->groupBy('menu_key')
            ->map(function ($permissions, $menuKey) use ($menuLabels, $actionLabels) {
                return [
                    'label' => $menuLabels[$menuKey] ?? $menuKey,
                    'permissions' => $permissions->map(function ($permission) use ($actionLabels) {
                        return [
                            'id' => $permission->id,
                            'action' => $permission->action,
                            'action_label' => $actionLabels[$permission->action] ?? $permission->action,
                        ];
                    })->values(),
                ];
            })
            ->toArray();
    }
}
