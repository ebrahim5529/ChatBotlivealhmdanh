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
    { title: 'مواقع واستفسارات', href: '/admin/site-inquiries' },
    { title: 'إضافة موقع', href: '/admin/site-inquiries/create' },
];

export default function SiteInquiryCreate() {
    const { data, setData, post, processing, errors } = useForm({
        site_name: '',
        mobile_number: '',
        site_url: '',
        site_description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/site-inquiries');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="إضافة موقع" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/admin/site-inquiries">
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            إضافة موقع
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            إضافة موقع واستفسار جديد
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="space-y-2">
                        <Label htmlFor="site_name">اسم الموقع *</Label>
                        <Input
                            id="site_name"
                            value={data.site_name}
                            onChange={(e) => setData('site_name', e.target.value)}
                            placeholder="مثال: موقع الشركة"
                            required
                        />
                        <InputError message={errors.site_name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobile_number">رقم الجوال *</Label>
                        <Input
                            id="mobile_number"
                            value={data.mobile_number}
                            onChange={(e) =>
                                setData('mobile_number', e.target.value)
                            }
                            placeholder="05xxxxxxxx"
                            inputMode="numeric"
                            required
                        />
                        <InputError message={errors.mobile_number} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="site_url">رابط الموقع *</Label>
                        <Input
                            id="site_url"
                            type="url"
                            value={data.site_url}
                            onChange={(e) => setData('site_url', e.target.value)}
                            placeholder="https://example.com"
                            required
                        />
                        <InputError message={errors.site_url} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="site_description">وصف الموقع</Label>
                        <Textarea
                            id="site_description"
                            value={data.site_description}
                            onChange={(e) =>
                                setData('site_description', e.target.value)
                            }
                            placeholder="وصف مختصر..."
                            rows={4}
                        />
                        <InputError message={errors.site_description} />
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'جاري الحفظ...' : 'حفظ'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/site-inquiries">إلغاء</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

