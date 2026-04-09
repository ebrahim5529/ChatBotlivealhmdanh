import { Head, Link, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Search, RotateCcw } from 'lucide-react';
import { useCallback, useState } from 'react';
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Category = {
    id: number;
    name: string;
};

type Package = {
    id: number;
    offer_number: string | null;
    category: Category | null;
    offer_type: string | null;
    brand_name: string | null;
    details: string | null;
    start_date: string | null;
    end_date: string | null;
    location_link: string | null;
    location_description: string | null;
    created_at: string;
};

type Props = {
    packages: {
        data: Package[];
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    gradeLevels: string[];
    categories: Category[];
    filters: {
        search?: string;
        grade_level?: string;
        category_id?: string;
        per_page?: number;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'إدارة العروض', href: '/admin/sales/packages' },
    { title: 'قائمة العروض', href: '/admin/sales/packages' },
];

export default function PackagesIndex({
    packages,
    gradeLevels,
    categories,
    filters,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [gradeLevel, setGradeLevel] = useState(filters.grade_level ?? '');
    const [categoryId, setCategoryId] = useState(filters.category_id ?? '');
    const [perPage, setPerPage] = useState(
        String(filters.per_page ?? 10)
    );

    const applyFilters = useCallback(() => {
        router.get('/admin/sales/packages', {
            search: search || undefined,
            grade_level: gradeLevel || undefined,
            category_id: categoryId || undefined,
            per_page: perPage || undefined,
        });
    }, [search, gradeLevel, categoryId, perPage]);

    const clearFilters = useCallback(() => {
        setSearch('');
        setGradeLevel('');
        setCategoryId('');
        setPerPage('10');
        router.get('/admin/sales/packages');
    }, []);

    const totalPackages = packages.total;
    const totalCategories = new Set(packages.data.map((p) => p.category?.id).filter(Boolean)).size;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="إدارة العروض" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            إدارة العروض
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            عرض ومتابعة العروض المتوفرة للأقسام المختلفة
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/sales/packages/create">
                            <Plus className="size-4" />
                            إضافة عرض
                        </Link>
                    </Button>
                </div>

                {/* بطاقات الإحصائيات */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            إجمالي العروض
                        </p>
                        <p className="text-2xl font-semibold text-primary">
                            {totalPackages}
                        </p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            عدد التصنيفات
                        </p>
                        <p className="text-2xl font-semibold text-primary">
                            {totalCategories}
                        </p>
                    </div>
                </div>

                {/* نظام التصفية */}
                <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex flex-wrap items-end gap-4">
                        <div className="flex-1 min-w-[200px]">
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                البحث
                            </label>
                            <div className="relative">
                                <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    placeholder="البحث برقم العرض أو البراند أو التفاصيل"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pr-10"
                                />
                            </div>
                        </div>
                        <div className="min-w-[150px]">
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                التصنيف
                            </label>
                            <Select
                                value={categoryId}
                                onValueChange={setCategoryId}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="الكل" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem key={c.id} value={String(c.id)}>
                                            {c.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="min-w-[150px]">
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                الصف الدراسي
                            </label>
                            <Select
                                value={gradeLevel}
                                onValueChange={setGradeLevel}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="الكل" />
                                </SelectTrigger>
                                <SelectContent>
                                    {gradeLevels.map((g) => (
                                        <SelectItem key={g} value={g}>
                                            {g}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="min-w-[120px]">
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                عدد النتائج
                            </label>
                            <Select
                                value={perPage}
                                onValueChange={setPerPage}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={applyFilters}>تطبيق</Button>
                            <Button variant="outline" onClick={clearFilters}>
                                <RotateCcw className="size-4" />
                                مسح
                            </Button>
                        </div>
                    </div>
                </div>

                {/* جدول العروض */}
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        رقم العرض
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        التصنيف
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        نوع العرض
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        البراند
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        تاريخ البداية
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        تاريخ النهاية
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {packages.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            لا توجد عروض
                                        </td>
                                    </tr>
                                ) : (
                                    packages.data.map((pkg) => (
                                        <tr
                                            key={pkg.id}
                                            className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                {pkg.offer_number || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {pkg.category?.name || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {pkg.offer_type || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {pkg.brand_name || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {pkg.start_date
                                                    ? new Date(pkg.start_date).toLocaleDateString('ar-SA')
                                                    : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {pkg.end_date
                                                    ? new Date(pkg.end_date).toLocaleDateString('ar-SA')
                                                    : '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/sales/packages/${pkg.id}/edit`}
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
                                                        description="هل أنت متأكد من حذف هذا العرض؟ لا يمكن التراجع عن هذا الإجراء."
                                                        deleteUrl={`/admin/sales/packages/${pkg.id}`}
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

                {/* Pagination */}
                {packages.links.length > 3 && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {packages.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className="min-w-[40px]"
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
