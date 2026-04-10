import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Role = {
    id: number;
    name: string;
    users_count: number;
    created_at: string;
};

type Props = {
    roles: {
        data: Role[];
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'الأدوار', href: '/admin/roles' },
];

export default function RolesIndex({ roles }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="الأدوار" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            الأدوار والصلاحيات
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            إدارة أدوار المستخدمين
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/roles/create">
                            <Plus className="size-4" />
                            إضافة دور
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            إجمالي الأدوار
                        </p>
                        <p className="text-2xl font-semibold text-primary">
                            {roles.total}
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        اسم الدور
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        عدد المستخدمين
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {roles.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            لا توجد أدوار
                                        </td>
                                    </tr>
                                ) : (
                                    roles.data.map((role) => (
                                        <tr
                                            key={role.id}
                                            className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                {role.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                                    {role.users_count} مستخدم
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/roles/${role.id}/edit`}
                                                        >
                                                            <Pencil className="size-4" />
                                                        </Link>
                                                    </Button>
                                                    <DeleteConfirmDialog
                                                        trigger={
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </Button>
                                                        }
                                                        title="تأكيد الحذف"
                                                        description="هل أنت متأكد من حذف هذا الدور؟ لا يمكن التراجع عن هذا الإجراء."
                                                        deleteUrl={`/admin/roles/${role.id}`}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
