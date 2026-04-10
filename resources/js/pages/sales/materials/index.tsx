import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Material = {
    id: number;
    name: string;
    created_at: string;
};

type Props = {
    materials: {
        data: Material[];
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'العروض', href: '/admin/sales/packages' },
    { title: 'تصنيفات  ', href: '/admin/sales/materials' },
];

export default function MaterialsIndex({ materials }: Props) {
    const totalMaterials = materials.total;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="تصنيفات  " />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            تصنيفات  
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            قائمة تصنيفات  
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/sales/materials/create">
                            <Plus className="size-4" />
                            إضافة تصنيف
                        </Link>
                    </Button>
                </div>

                {/* بطاقات الإحصائيات */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            إجمالي التصنيفات
                        </p>
                        <p className="text-2xl font-semibold text-primary">
                            {totalMaterials}
                        </p>
                    </div>
                </div>

                {/* جدول التصنيفات */}
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[400px]">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        اسم التصنيف
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {materials.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            لا توجد تصنيفات
                                        </td>
                                    </tr>
                                ) : (
                                    materials.data.map((mat) => (
                                        <tr
                                            key={mat.id}
                                            className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                {mat.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/sales/materials/${mat.id}/edit`}
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
                                                        description="هل أنت متأكد من حذف هذا التصنيف؟ لا يمكن التراجع عن هذا الإجراء."
                                                        deleteUrl={`/admin/sales/materials/${mat.id}`}
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
