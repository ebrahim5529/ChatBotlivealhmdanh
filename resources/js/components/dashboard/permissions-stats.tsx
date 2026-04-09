import { Shield, Key, Users, Clock } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';

const stats = [
    { title: 'إجمالي الأدوار', value: 4, icon: Shield, variant: 'roles' as const },
    {
        title: 'إجمالي الصلاحيات',
        value: 85,
        icon: Key,
        variant: 'permissions' as const,
    },
    {
        title: 'المستخدمين النشطين',
        value: 28,
        icon: Users,
        variant: 'users' as const,
    },
    {
        title: 'طلبات بانتظار الموافقة',
        value: 3,
        icon: Clock,
        variant: 'pending' as const,
    },
];

export function PermissionsStats() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
