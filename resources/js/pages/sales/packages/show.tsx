import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DeleteConfirmDialog } from '@/components/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type User = {
    id: number;
    name: string;
};

type Category = {
    id: number;
    name: string;
};

type Package = {
    id: number;
    offer_number: string | null;
    category: Category | null;
    user: User | null;
    offer_type: string | null;
    brand_name: string | null;
    details: string | null;
    start_date: string | null;
    end_date: string | null;
    location_link: string | null;
    location_description: string | null;
    look_location_link: string | null;
    images_base64: string[] | null;
    created_at: string;
};

type Props = {
    package: Package;
};

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'إدارة العروض', href: '/admin/sales/packages' },
    { title: 'تفاصيل العرض', href: `/admin/sales/packages/${id}` },
];

function formatDate(value: string | null) {
    if (!value) return '-';
    return new Date(value).toLocaleDateString('ar-SA');
}

function Field({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </p>
            <div className="text-sm text-gray-900 dark:text-white">{value}</div>
        </div>
    );
}

export default function PackageShow({ package: pkg }: Props) {
    const [preview, setPreview] = useState<{ src: string; index: number } | null>(
        null
    );

    const images = useMemo(() => {
        if (!Array.isArray(pkg.images_base64)) return [];
        return pkg.images_base64.filter(Boolean);
    }, [pkg.images_base64]);

    return (
        <AppLayout breadcrumbs={breadcrumbs(pkg.id)}>
            <Head title="تفاصيل العرض" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/admin/sales/packages">
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                تفاصيل العرض
                            </h1>
                            <p className="mt-1 text-gray-600 dark:text-gray-400">
                                عرض تفاصيل العرض والصور
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={`/admin/sales/packages/${pkg.id}/edit`}>
                                <Pencil className="size-4" />
                                تعديل
                            </Link>
                        </Button>
                        <DeleteConfirmDialog
                            trigger={
                                <Button
                                    variant="destructive"
                                    className="gap-2"
                                >
                                    <Trash2 className="size-4" />
                                    حذف
                                </Button>
                            }
                            title="تأكيد الحذف"
                            description="هل أنت متأكد من حذف هذا العرض؟ لا يمكن التراجع عن هذا الإجراء."
                            deleteUrl={`/admin/sales/packages/${pkg.id}`}
                        />
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                البيانات
                            </h2>
                            <div className="mt-4 grid gap-6 sm:grid-cols-2">
                                <Field
                                    label="رقم العرض"
                                    value={pkg.offer_number || '-'}
                                />
                                <Field
                                    label="التصنيف"
                                    value={pkg.category?.name || '-'}
                                />
                                <Field
                                    label="نوع العرض"
                                    value={pkg.offer_type || '-'}
                                />
                                <Field
                                    label="البراند"
                                    value={pkg.brand_name || '-'}
                                />
                                <Field
                                    label="تم الإضافة بواسطة"
                                    value={pkg.user?.name || '-'}
                                />
                                <Field
                                    label="تاريخ البداية"
                                    value={formatDate(pkg.start_date)}
                                />
                                <Field
                                    label="تاريخ النهاية"
                                    value={formatDate(pkg.end_date)}
                                />
                                <Field
                                    label="رابط الموقع"
                                    value={
                                        pkg.location_link ? (
                                            <a
                                                href={pkg.location_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-primary underline-offset-4 hover:underline"
                                            >
                                                {pkg.location_link}
                                            </a>
                                        ) : (
                                            '-'
                                        )
                                    }
                                />
                                <Field
                                    label="رابط اللوكيشن"
                                    value={
                                        pkg.look_location_link ? (
                                            <a
                                                href={pkg.look_location_link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-primary underline-offset-4 hover:underline"
                                            >
                                                {pkg.look_location_link}
                                            </a>
                                        ) : (
                                            '-'
                                        )
                                    }
                                />
                                <div className="sm:col-span-2">
                                    <Field
                                        label="التفاصيل"
                                        value={
                                            pkg.details ? (
                                                <p className="whitespace-pre-wrap leading-6 text-gray-700 dark:text-gray-200">
                                                    {pkg.details}
                                                </p>
                                            ) : (
                                                '-'
                                            )
                                        }
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <Field
                                        label="وصف الموقع"
                                        value={
                                            pkg.location_description ? (
                                                <p className="whitespace-pre-wrap leading-6 text-gray-700 dark:text-gray-200">
                                                    {pkg.location_description}
                                                </p>
                                            ) : (
                                                '-'
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    الصور
                                </h2>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {images.length} صورة
                                </span>
                            </div>

                            {images.length === 0 ? (
                                <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-600 dark:border-gray-600 dark:text-gray-300">
                                    لا توجد صور لهذا العرض
                                </div>
                            ) : (
                                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                    {images.map((src, index) => (
                                        <li key={`${index}-${src.slice(0, 32)}`}>
                                            <button
                                                type="button"
                                                onClick={() => setPreview({ src, index })}
                                                className="group relative w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                                            >
                                                <img
                                                    src={src}
                                                    alt=""
                                                    className="h-28 w-full object-cover transition-transform group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                                <span className="pointer-events-none absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                                                    <ImageIcon className="size-3.5" />
                                                    {index + 1}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                إجراءات
                            </h2>
                            <div className="mt-4 flex flex-col gap-2">
                                <Button asChild>
                                    <Link href={`/admin/sales/packages/${pkg.id}/edit`}>
                                        <Pencil className="size-4" />
                                        تعديل العرض
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/admin/sales/packages">
                                        رجوع للقائمة
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Dialog
                    open={Boolean(preview)}
                    onOpenChange={(open) => !open && setPreview(null)}
                >
                    <DialogContent className="max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>
                                صورة رقم {preview ? preview.index + 1 : ''}
                            </DialogTitle>
                        </DialogHeader>
                        {preview?.src ? (
                            <img
                                src={preview.src}
                                alt=""
                                className="max-h-[75vh] w-full rounded-lg object-contain"
                            />
                        ) : null}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}

