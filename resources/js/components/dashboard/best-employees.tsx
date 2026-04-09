import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const employees = [
    { name: 'أحمد محمد', resolved: 15, rank: 1 },
    { name: 'سارة علي', resolved: 12, rank: 2 },
    { name: 'خالد عمر', resolved: 10, rank: 3 },
    { name: 'فاطمة حسن', resolved: 8, rank: 4 },
    { name: 'محمد عبدالله', resolved: 6, rank: 5 },
];

export function BestEmployees() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>أفضل الموظفين</CardTitle>
                <CardDescription>
                    ترتيب الموظفين حسب عدد التذاكر المحلولة
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {employees.map((emp) => (
                        <div
                            key={emp.name}
                            className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800/50"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                    {emp.rank}
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    {emp.name}
                                </span>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {emp.resolved} تذكرة محلولة
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
