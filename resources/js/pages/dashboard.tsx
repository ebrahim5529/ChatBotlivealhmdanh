import { Head } from '@inertiajs/react';
import {
    BestEmployees,
    MonthlySummary,
    PermissionsStats,
    TicketDistributionChart,
    TicketGrowthChart,
    TicketReportChart,
    TicketStatsCards,
} from '@/components/dashboard';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'لوحة التحكم',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="لوحة التحكم" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        لوحة التحكم
                    </h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        إحصائيات وتقارير الدعم الفني والصلاحيات
                    </p>
                </div>

                {/* إحصائيات الدعم الفني */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        إحصائيات الدعم الفني
                    </h2>
                    <TicketStatsCards />
                </section>

                {/* التقارير والرسوم البيانية */}
                <section className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>تقرير التذاكر (6 أشهر)</CardTitle>
                            <CardDescription>
                                عدد التذاكر شهرياً
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TicketReportChart />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>تقرير نمو التذاكر</CardTitle>
                            <CardDescription>
                                نمو التذاكر التراكمي
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TicketGrowthChart />
                        </CardContent>
                    </Card>
                </section>

                <section className="grid gap-6 lg:grid-cols-3">
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle>توزيع التذاكر حسب الحالة</CardTitle>
                            <CardDescription>
                                رسم بياني دائري
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TicketDistributionChart />
                        </CardContent>
                    </Card>
                    <div className="lg:col-span-2">
                        <BestEmployees />
                    </div>
                </section>

                {/* ملخص التقرير الشهري */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        ملخص التقرير الشهري
                    </h2>
                    <MonthlySummary />
                </section>

                {/* إحصائيات الصلاحيات */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                        إحصائيات الصلاحيات
                    </h2>
                    <PermissionsStats />
                </section>
            </div>
        </AppLayout>
    );
}
