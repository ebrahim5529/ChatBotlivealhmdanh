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

type Props = {
    categories: Category[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'إدارة العروض', href: '/admin/sales/packages' },
    { title: 'إضافة عرض', href: '/admin/sales/packages/create' },
];

export default function PackageCreate({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        offer_number: '',
        category_id: '',
        offer_type: '',
        brand_name: '',
        details: '',
        start_date: '',
        end_date: '',
        location_link: '',
        location_description: '',
        look_location_link: '',
        images: [] as File[],
    });

    const [imagesSizeError, setImagesSizeError] = useState<string | null>(null);

    const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

        const merged = [...data.images, ...allowed].slice(0, MAX_IMAGES);
        setData('images', merged);
    };

    const removeImageAt = (index: number) => {
        setData(
            'images',
            data.images.filter((_, i) => i !== index),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/sales/packages', { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="إضافة عرض" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/sales/packages">
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            إضافة عرض
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            إضافة عرض جديد
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
                                القائمة من{' '}
                                <Link
                                    href="/admin/sales/materials"
                                    className="text-primary underline-offset-4 hover:underline"
                                >
                                    تصنيفات
                                </Link>
                                — أضف تصنيفاتاً من هناك إن لزم.
                            </p>
                            {categories.length === 0 ? (
                                <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
                                    لا توجد تصنيفات في النظام.{' '}
                                    <Link
                                        href="/admin/sales/materials/create"
                                        className="font-medium text-primary underline-offset-4 hover:underline"
                                    >
                                        أضف تصنيفاً من هنا
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
                        <Label htmlFor="package_images">صور العرض</Label>
                        <p className="text-xs text-muted-foreground">
                            يتم رفع الصور وتخزينها بشكل محمي داخل لوحة الإدارة — حتى {MAX_IMAGES} صورة،
                            صيغ: JPEG، PNG، WebP، GIF.
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button type="button" variant="outline" size="sm" asChild>
                                <label
                                    htmlFor="package_images"
                                    className="inline-flex cursor-pointer items-center gap-2"
                                >
                                    <ImagePlus className="size-4" />
                                    اختر صوراً
                                </label>
                            </Button>
                            <Input
                                id="package_images"
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
                                multiple
                                className="hidden"
                                onChange={handleImagesChange}
                            />
                        </div>
                        <InputError message={imagesSizeError ?? undefined} />
                        <InputError message={errors.images} />
                        {data.images.length > 0 && (
                            <ul className="mt-2 flex flex-wrap gap-3">
                                {data.images.map((file, index) => (
                                    <li
                                        key={`${index}-${file.name}-${file.size}`}
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
                                            onClick={() => removeImageAt(index)}
                                            aria-label="إزالة الصورة"
                                        >
                                            <X className="size-3.5" />
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'جاري الحفظ...' : 'حفظ'}
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
