import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type SiteInquiry = {
    id: number;
    site_name: string;
    mobile_number: string;
    site_url: string;
    site_description: string | null;
    created_at: string;
};

type Props = {
    inquiries: {
        data: SiteInquiry[];
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'مواقع واستفسارات', href: '/admin/site-inquiries' },
];

export default function SiteInquiriesIndex({ inquiries }: Props) {
    const totalInquiries = inquiries.total;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="مواقع واستفسارات" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            مواقع واستفسارات
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            قائمة المواقع والاستفسارات
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/site-inquiries/create">
                            <Plus className="size-4" />
                            إضافة موقع
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            إجمالي المواقع
                        </p>
                        <p className="text-2xl font-semibold text-primary">
                            {totalInquiries}
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px]">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        اسم الموقع
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        رقم الجوال
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        رابط الموقع
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الوصف
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {inquiries.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            لا توجد مواقع
                                        </td>
                                    </tr>
                                ) : (
                                    inquiries.data.map((inquiry) => (
                                        <tr
                                            key={inquiry.id}
                                            className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                {inquiry.site_name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                {inquiry.mobile_number}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                                                <a
                                                    href={inquiry.site_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-2 hover:text-primary"
                                                >
                                                    <span className="max-w-[360px] truncate">
                                                        {inquiry.site_url}
                                                    </span>
                                                    <ExternalLink className="size-4" />
                                                </a>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-sm truncate">
                                                {inquiry.site_description ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link
                                                            href={`/admin/site-inquiries/${inquiry.id}/edit`}
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
                                                        description="هل أنت متأكد من حذف هذا الموقع؟ لا يمكن التراجع عن هذا الإجراء."
                                                        deleteUrl={`/admin/site-inquiries/${inquiry.id}`}
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

