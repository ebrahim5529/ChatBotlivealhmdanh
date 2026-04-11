import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Permission = {
    id: number;
    action: string;
    action_label: string;
};

type PermissionGroup = {
    label: string;
    permissions: Permission[];
};

type Role = {
    id: number;
    name: string;
};

type Props = {
    role: Role;
    permissions: Record<string, PermissionGroup>;
    rolePermissions: number[];
};

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'الأدوار', href: '/admin/roles' },
    { title: 'تعديل دور', href: `/admin/roles/${id}/edit` },
];

export default function RoleEdit({ role, permissions, rolePermissions }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        permissions: rolePermissions,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/roles/${role.id}`);
    };

    const togglePermission = (permissionId: number) => {
        const current = data.permissions;
        if (current.includes(permissionId)) {
            setData('permissions', current.filter(id => id !== permissionId));
        } else {
            setData('permissions', [...current, permissionId]);
        }
    };

    const toggleAllPermissions = (permissionIds: number[]) => {
        const current = data.permissions;
        const allSelected = permissionIds.every(id => current.includes(id));
        if (allSelected) {
            setData('permissions', current.filter(id => !permissionIds.includes(id)));
        } else {
            setData('permissions', [...new Set([...current, ...permissionIds])]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(role.id)}>
            <Head title="تعديل دور" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/roles">
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            تعديل دور
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            تعديل بيانات الدور والصلاحيات
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="max-w-xl rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <div className="space-y-2">
                            <Label htmlFor="name">اسم الدور *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="مثال: مدير"
                                required
                            />
                            <InputError message={errors.name} />
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="mb-4 text-lg font-semibold">الصلاحيات</h2>
                        <div className="space-y-6">
                            {Object.entries(permissions).map(([key, group]) => {
                                const permissionIds = group.permissions.map(p => p.id);
                                const allSelected = permissionIds.every(id => data.permissions.includes(id));
                                const someSelected = permissionIds.some(id => data.permissions.includes(id)) && !allSelected;

                                return (
                                    <div key={key} className="rounded-lg border border-gray-100 p-4 dark:border-gray-700">
                                        <div className="mb-3 flex items-center gap-2">
                                            <Checkbox
                                                id={`group-${key}`}
                                                checked={allSelected}
                                                data-state={someSelected ? 'indeterminate' : allSelected ? 'checked' : 'unchecked'}
                                                onCheckedChange={() => toggleAllPermissions(permissionIds)}
                                            />
                                            <Label htmlFor={`group-${key}`} className="font-semibold">
                                                {group.label}
                                            </Label>
                                        </div>
                                        <div className="mr-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                            {group.permissions.map((permission) => (
                                                <div key={permission.id} className="flex items-center gap-2">
                                                    <Checkbox
                                                        id={`perm-${permission.id}`}
                                                        checked={data.permissions.includes(permission.id)}
                                                        onCheckedChange={() => togglePermission(permission.id)}
                                                    />
                                                    <Label htmlFor={`perm-${permission.id}`} className="text-sm">
                                                        {permission.action_label}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <InputError message={errors.permissions} />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'جاري التحديث...' : 'تحديث'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/roles">إلغاء</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
