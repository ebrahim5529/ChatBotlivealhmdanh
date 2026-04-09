import {
    Ticket,
    CircleDot,
    Loader2,
    CheckCircle2,
    XCircle,
} from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';

const stats = [
    { title: 'إجمالي التذاكر', value: 45, icon: Ticket, variant: 'primary' as const },
    { title: 'المفتوحة', value: 12, icon: CircleDot, variant: 'open' as const },
    {
        title: 'قيد المعالجة',
        value: 8,
        icon: Loader2,
        variant: 'progress' as const,
    },
    {
        title: 'المحلولة',
        value: 20,
        icon: CheckCircle2,
        variant: 'resolved' as const,
    },
    { title: 'المغلقة', value: 5, icon: XCircle, variant: 'closed' as const },
];

export function TicketStatsCards() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
                <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    variant={stat.variant}
                />
            ))}
        </div>
    );
}
