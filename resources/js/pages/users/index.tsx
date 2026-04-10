import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Role = {
    id: number;
    name: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    role: Role | null;
    created_at: string;
};

type Props = {
    users: {
        data: User[];
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'المستخدمين', href: '/admin/users' },
];

export default function UsersIndex({ users }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="المستخدمين" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            المستخدمين
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            إدارة المستخدمين وصلاحياتهم
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/users/create">
                            <Plus className="size-4" />
                            إضافة مستخدم
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            إجمالي المستخدمين
                        </p>
                        <p className="text-2xl font-semibold text-primary">
                            {users.total}
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الاسم
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        البريد الإلكتروني
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الدور
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        تاريخ الإنشاء
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            لا يوجد مستخدمين
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {user.role ? (
                                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        {user.role.name}
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                                        بدون دور
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(user.created_at).toLocaleDateString('ar-SA')}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/users/${user.id}/edit`}
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
                                                        description="هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء."
                                                        deleteUrl={`/admin/users/${user.id}`}
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
