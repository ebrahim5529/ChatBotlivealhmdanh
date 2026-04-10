import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'العروض', href: '/admin/sales/packages' },
    { title: 'تصنيفات  ', href: '/admin/sales/materials' },
    { title: 'إضافة تصنيف', href: '/admin/sales/materials/create' },
];

export default function MaterialCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/sales/materials');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="إضافة تصنيف" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/sales/materials">
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            إضافة تصنيف
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            إضافة تصنيف جديد للمواد
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">اسم التصنيف *</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="مثال: اسم التصنيف"
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'جاري الحفظ...' : 'حفظ'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/sales/materials">إلغاء</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
