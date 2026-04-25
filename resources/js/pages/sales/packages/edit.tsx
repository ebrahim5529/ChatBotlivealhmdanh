import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, ImagePlus, X } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const MAX_IMAGES = 20;
const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;

type Category = {
    id: number;
    name: string;
};

type Package = {
    id: number;
    offer_number: string | null;
    category_id: number | null;
    offer_type: string | null;
    brand_name: string | null;
    details: string | null;
    start_date: string | null;
    end_date: string | null;
    location_link: string | null;
    location_description: string | null;
    look_location_link: string | null;
    images_base64: string[] | null;
    image_paths?: string[] | null;
};

type Props = {
    package: Package;
    categories: Category[];
};

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'إدارة العروض', href: '/admin/sales/packages' },
    { title: 'تعديل العرض', href: `/admin/sales/packages/${id}/edit` },
];

export default function PackageEdit({ package: pkg, categories }: Props) {
    const initialPaths = Array.isArray(pkg.image_paths) ? pkg.image_paths.filter(Boolean) : [];

    const { data, setData, put, processing, errors } = useForm({
        offer_number: pkg.offer_number ?? '',
        category_id: pkg.category_id ? String(pkg.category_id) : '',
        offer_type: pkg.offer_type ?? '',
        brand_name: pkg.brand_name ?? '',
        details: pkg.details ?? '',
        start_date: pkg.start_date ?? '',
        end_date: pkg.end_date ?? '',
        location_link: pkg.location_link ?? '',
        location_description: pkg.location_description ?? '',
        look_location_link: pkg.look_location_link ?? '',
        retained_image_paths: initialPaths,
        images: [] as File[],
    });

    const [imagesSizeError, setImagesSizeError] = useState<string | null>(null);

    const handleNewImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const list = e.target.files ? Array.from(e.target.files) : [];
        e.target.value = '';
        if (list.length === 0) {
            return;
        }

        const tooLarge = list.filter((f) => f.size > MAX_IMAGE_SIZE_BYTES);
        const allowed = list.filter((f) => f.size <= MAX_IMAGE_SIZE_BYTES);

        if (tooLarge.length > 0) {
            setImagesSizeError('حجم الصورة يجب ألا يتجاوز 10 ميجابايت.');
        } else {
            setImagesSizeError(null);
        }

        if (allowed.length === 0) {
            return;
        }

        const merged = [...data.images, ...allowed].slice(
            0,
            Math.max(0, MAX_IMAGES - data.retained_image_paths.length)
        );
        setData('images', merged);
    };

    const removeRetainedImageAt = (index: number) => {
        setData(
            'retained_image_paths',
            data.retained_image_paths.filter((_, i) => i !== index),
        );
    };

    const removeNewImageAt = (index: number) => {
        setData(
            'images',
            data.images.filter((_, i) => i !== index),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/sales/packages/${pkg.id}`, { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(pkg.id)}>
            <Head title="تعديل العرض" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/sales/packages">
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            تعديل العرض
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            تعديل بيانات العرض
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-4xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="offer_number">رقم العرض</Label>
                            <Input
                                id="offer_number"
                                value={data.offer_number}
                                onChange={(e) => setData('offer_number', e.target.value)}
                                placeholder="مثال: OFF-2024-001"
                            />
                            <InputError message={errors.offer_number} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category_id">التصنيف</Label>
                            <p className="text-xs text-muted-foreground">
                                من جدول{' '}
                                <Link
                                    href="/admin/sales/materials"
                                    className="text-primary underline-offset-4 hover:underline"
                                >
                                    تصنيفات
                                </Link>
                            </p>
                            {categories.length === 0 ? (
                                <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
                                    لا توجد تصنيفات.{' '}
                                    <Link
                                        href="/admin/sales/materials/create"
                                        className="font-medium text-primary underline-offset-4 hover:underline"
                                    >
                                        أضف تصنيفاً
                                    </Link>
                                </p>
                            ) : (
                                <Select
                                    value={data.category_id}
                                    onValueChange={(v) => setData('category_id', v)}
                                >
                                    <SelectTrigger id="category_id">
                                        <SelectValue placeholder="اختر التصنيف" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((c) => (
                                            <SelectItem key={c.id} value={String(c.id)}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            <InputError message={errors.category_id} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="offer_type">نوع العرض</Label>
                            <Input
                                id="offer_type"
                                value={data.offer_type}
                                onChange={(e) => setData('offer_type', e.target.value)}
                                placeholder="مثال: خصم"
                            />
                            <InputError message={errors.offer_type} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="brand_name">اسم البراند</Label>
                            <Input
                                id="brand_name"
                                value={data.brand_name}
                                onChange={(e) => setData('brand_name', e.target.value)}
                                placeholder="مثال: براند 1"
                            />
                            <InputError message={errors.brand_name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="start_date">تاريخ البداية</Label>
                            <Input
                                id="start_date"
                                type="date"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                            />
                            <InputError message={errors.start_date} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="end_date">تاريخ النهاية</Label>
                            <Input
                                id="end_date"
                                type="date"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                            />
                            <InputError message={errors.end_date} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location_link">رابط الموقع</Label>
                            <Input
                                id="location_link"
                                value={data.location_link}
                                onChange={(e) => setData('location_link', e.target.value)}
                                placeholder="https://example.com"
                            />
                            <InputError message={errors.location_link} />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="look_location_link">رابط اللوكيشن</Label>
                            <Input
                                id="look_location_link"
                                value={data.look_location_link}
                                onChange={(e) => setData('look_location_link', e.target.value)}
                                placeholder="رابط خرائط أو موقع اللوكيشن"
                            />
                            <InputError message={errors.look_location_link} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="details">التفاصيل</Label>
                        <Textarea
                            id="details"
                            value={data.details}
                            onChange={(e) => setData('details', e.target.value)}
                            placeholder="وصف تفصيلي للعرض"
                            rows={3}
                        />
                        <InputError message={errors.details} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location_description">وصف الموقع</Label>
                        <Textarea
                            id="location_description"
                            value={data.location_description}
                            onChange={(e) => setData('location_description', e.target.value)}
                            placeholder="وصف الموقع"
                            rows={2}
                        />
                        <InputError message={errors.location_description} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="package_images_edit">صور العرض</Label>
                        <p className="text-xs text-muted-foreground">
                            الصور المحفوظة والجديدة تظهر أدناه؛ احذف ما تشاء ثم احفظ. حتى {MAX_IMAGES} صورة.
                        </p>
                        {(data.retained_image_paths.length > 0 || data.images.length > 0) && (
                            <ul className="flex flex-wrap gap-3">
                                {data.retained_image_paths.map((path, index) => (
                                    <li
                                        key={`retained-${index}-${path}`}
                                        className="relative inline-block rounded-lg border border-gray-200 dark:border-gray-600"
                                    >
                                        <img
                                            src={`/admin/sales/packages/${pkg.id}/images/${encodeURIComponent(path.split('/').pop() ?? '')}`}
                                            alt=""
                                            className="h-24 w-24 rounded-lg object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -right-2 -top-2 size-7 rounded-full shadow-md"
                                            onClick={() => removeRetainedImageAt(index)}
                                            aria-label="إزالة الصورة"
                                        >
                                            <X className="size-3.5" />
                                        </Button>
                                    </li>
                                ))}

                                {data.images.map((file, index) => (
                                    <li
                                        key={`new-${index}-${file.name}-${file.size}`}
                                        className="relative inline-block rounded-lg border border-gray-200 dark:border-gray-600"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt=""
                                            className="h-24 w-24 rounded-lg object-cover"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -right-2 -top-2 size-7 rounded-full shadow-md"
                                            onClick={() => removeNewImageAt(index)}
                                            aria-label="إزالة الصورة"
                                        >
                                            <X className="size-3.5" />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                            <Button type="button" variant="outline" size="sm" asChild>
                                <label
                                    htmlFor="package_images_edit"
                                    className="inline-flex cursor-pointer items-center gap-2"
                                >
                                    <ImagePlus className="size-4" />
                                    إضافة صور
                                </label>
                            </Button>
                            <Input
                                id="package_images_edit"
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
                                multiple
                                className="hidden"
                                onChange={handleNewImagesChange}
                            />
                        </div>
                        <InputError message={imagesSizeError ?? undefined} />
                        <InputError message={errors.images} />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'جاري التحديث...' : 'تحديث'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/sales/packages">إلغاء</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
