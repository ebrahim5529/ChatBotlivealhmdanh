import { Head, Link } from '@inertiajs/react';
import { BookOpen, Layers, MessageCircle, Shield, ShoppingBag, User } from 'lucide-react';
import { PackagesTrendChart, type PackagesPerMonthPoint } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

type Stats = {
    packages: number;
    materials: number;
    users: number;
    roles: number;
    bot_responses: number;
};

type Props = {
    stats: Stats;
    packagesPerMonth: PackagesPerMonthPoint[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: dashboard().url,
    },
];

export default function DashboardPage({ stats, packagesPerMonth }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="لوحة التحكم" />
            <div className="flex h-full flex-1 flex-col gap-8 overflow-x-auto p-4">
                <header>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        لوحة التحكم
                    </h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        نظرة سريعة موزّعة حسب أقسام القائمة الجانبية — بيانات فعلية من النظام
                    </p>
                </header>


                {/* العروض — يطابق قسم «العروض» في الشريط الجانبي */}
                <section aria-labelledby="section-offers">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <ShoppingBag className="size-4" />
                            </span>
                            <h2
                                id="section-offers"
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                العروض
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/sales/packages">
                                    <Layers className="ml-1 size-4" />
                                    إدارة العروض
                                </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/sales/materials">
                                    <BookOpen className="ml-1 size-4" />
                                    تصنيفات  
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <StatCard
                            title="إجمالي العروض"
                            value={stats.packages}
                            icon={Layers}
                            variant="primary"
                        />
                        <StatCard
                            title="تصنيفات  "
                            value={stats.materials}
                            icon={BookOpen}
                            variant="primary"
                        />
                    </div>
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>إضافة العروض (آخر 6 أشهر)</CardTitle>
                            <CardDescription>
                                عدد العروض المسجّلة شهرياً — من قاعدة البيانات
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PackagesTrendChart data={packagesPerMonth} />
                        </CardContent>
                    </Card>
                </section>

                {/* المستخدمون */}
                <section aria-labelledby="section-users">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <User className="size-4" />
                            </span>
                            <h2
                                id="section-users"
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                المستخدمون
                            </h2>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/users">إدارة المستخدمين</Link>
                        </Button>
                    </div>
                    <StatCard
                        title="إجمالي المستخدمين"
                        value={stats.users}
                        icon={User}
                        variant="users"
                    />
                </section>

                {/* الصلاحيات */}
                <section aria-labelledby="section-roles">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Shield className="size-4" />
                            </span>
                            <h2
                                id="section-roles"
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                الصلاحيات
                            </h2>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/roles">الأدوار والصلاحيات</Link>
                        </Button>
                    </div>
                    <StatCard
                        title="إجمالي الأدوار"
                        value={stats.roles}
                        icon={Shield}
                        variant="roles"
                    />
                </section>

                {/* ردود الشتات */}
                <section aria-labelledby="section-bot">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <MessageCircle className="size-4" />
                            </span>
                            <h2
                                id="section-bot"
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                            >
                                ردود الشتات
                            </h2>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/bot-responses">إدارة الردود</Link>
                        </Button>
                    </div>
                    <StatCard
                        title="إجمالي الردود المحفوظة"
                        value={stats.bot_responses}
                        icon={MessageCircle}
                        variant="primary"
                    />
                </section>
            </div>
        </AppLayout>
    );
}
