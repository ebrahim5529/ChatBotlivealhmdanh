import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    category_id: number | null;
    offer_type: string | null;
    brand_name: string | null;
    details: string | null;
    start_date: string | null;
    end_date: string | null;
    location_link: string | null;
    location_description: string | null;
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
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/sales/packages/${pkg.id}`);
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
                            <Select
                                value={data.category_id}
                                onValueChange={(v) => setData('category_id', v)}
                            >
                                <SelectTrigger>
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
