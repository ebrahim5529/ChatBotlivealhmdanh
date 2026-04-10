import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
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
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type User = {
    id: number;
    name: string;
    email: string;
    role_id: number | null;
};

type Props = {
    user: User;
    roles: Record<string, string>;
};

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'المستخدمين', href: '/admin/users' },
    { title: 'تعديل مستخدم', href: `/admin/users/${id}/edit` },
];

export default function UserEdit({ user, roles }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        role_id: user.role_id ? String(user.role_id) : '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs(user.id)}>
            <Head title="تعديل مستخدم" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/users">
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            تعديل مستخدم
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            تعديل بيانات المستخدم
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">الاسم *</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="مثال: أحمد محمد"
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="example@email.com"
                            required
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">كلمة المرور (اتركها فارغة إذا لم ترد التغيير)</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="********"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role_id">الدور</Label>
                        <Select
                            value={data.role_id}
                            onValueChange={(v) => setData('role_id', v)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="اختر الدور" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">بدون دور</SelectItem>
                                {Object.entries(roles).map(([id, name]) => (
                                    <SelectItem key={id} value={id}>
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role_id} />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'جاري التحديث...' : 'تحديث'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/users">إلغاء</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
