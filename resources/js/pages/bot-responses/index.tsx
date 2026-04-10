import { Head, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type BotResponse = {
    id: number;
    sender_name: string;
    message: string;
    response: string;
    created_at: string;
};

type Props = {
    responses: {
        data: BotResponse[];
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'ردود الشتات', href: '/admin/bot-responses' },
];

export default function BotResponsesIndex({ responses }: Props) {
    const totalResponses = responses.total;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ردود الشتات" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            ردود الشتات
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            قائمة ردود الشتات
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/bot-responses/create">
                            <Plus className="size-4" />
                            إضافة رد
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            إجمالي الردود
                        </p>
                        <p className="text-2xl font-semibold text-primary">
                            {totalResponses}
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        اسم المرسل
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الرسالة
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الرد
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                                        الإجراءات
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {responses.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                                        >
                                            لا توجد ردود
                                        </td>
                                    </tr>
                                ) : (
                                    responses.data.map((response) => (
                                        <tr
                                            key={response.id}
                                            className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-750"
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                                {response.sender_name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                                                {response.message}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                                                {response.response}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/bot-responses/${response.id}/edit`}
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
                                                        description="هل أنت متأكد من حذف هذا الرد؟ لا يمكن التراجع عن هذا الإجراء."
                                                        deleteUrl={`/admin/bot-responses/${response.id}`}
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
