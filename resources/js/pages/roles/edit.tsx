import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type Role = {
    id: number;
    name: string;
};

type Props = {
    role: Role;
};

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'الأدوار', href: '/admin/roles' },
    { title: 'تعديل دور', href: `/admin/roles/${id}/edit` },
];

export default function RoleEdit({ role }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/roles/${role.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(role.id)}>
            <Head title="تعديل دور" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/roles">
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            تعديل دور
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            تعديل بيانات الدور
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">اسم الدور *</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="مثال: مدير"
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'جاري التحديث...' : 'تحديث'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/roles">إلغاء</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
