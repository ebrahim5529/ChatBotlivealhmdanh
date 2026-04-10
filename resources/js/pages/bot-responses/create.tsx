import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'لوحة التحكم', href: '/dashboard' },
    { title: 'ردود الشتات', href: '/admin/bot-responses' },
    { title: 'إضافة رد', href: '/admin/bot-responses/create' },
];

export default function BotResponseCreate() {
    const { data, setData, post, processing, errors } = useForm({
        sender_name: '',
        message: '',
        response: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/bot-responses');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="إضافة رد" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/bot-responses">
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            إضافة رد
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            إضافة رد جديد للشتات
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="space-y-2">
                        <Label htmlFor="sender_name">اسم المرسل *</Label>
                        <Input
                            id="sender_name"
                            value={data.sender_name}
                            onChange={(e) => setData('sender_name', e.target.value)}
                            placeholder="مثال: أحمد"
                            required
                        />
                        <InputError message={errors.sender_name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">الرسالة *</Label>
                        <Textarea
                            id="message"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            placeholder="نص الرسالة..."
                            rows={3}
                            required
                        />
                        <InputError message={errors.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="response">الرد *</Label>
                        <Textarea
                            id="response"
                            value={data.response}
                            onChange={(e) => setData('response', e.target.value)}
                            placeholder="نص الرد..."
                            rows={3}
                            required
                        />
                        <InputError message={errors.response} />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'جاري الحفظ...' : 'حفظ'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/bot-responses">إلغاء</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
