import {
    Ticket,
    CheckCircle2,
    Clock,
    ThumbsUp,
} from 'lucide-react';

const summaryItems = [
    {
        label: 'إجمالي التذاكر',
        value: '45',
        change: '+12%',
        icon: Ticket,
    },
    {
        label: 'التذاكر المحلولة',
        value: '20',
        change: '+8%',
        icon: CheckCircle2,
    },
    {
        label: 'متوسط وقت الحل',
        value: '2.5 يوم',
        icon: Clock,
    },
    {
        label: 'معدل الرضا',
        value: '92%',
        icon: ThumbsUp,
    },
];

export function MonthlySummary() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summaryItems.map((item) => (
                <div
                    key={item.label}
                    className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                            <item.icon className="size-5" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.label}
                            </p>
                            <p className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                                {item.value}
                                {item.change && (
                                    <span className="text-sm font-normal text-green-600 dark:text-green-400">
                                        {item.change}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
