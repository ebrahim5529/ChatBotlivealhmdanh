import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatCardVariant =
    | 'primary'
    | 'open'
    | 'progress'
    | 'resolved'
    | 'closed'
    | 'roles'
    | 'permissions'
    | 'users'
    | 'pending';

const variantStyles: Record<
    StatCardVariant,
    { bg: string; text: string }
> = {
    primary: 'bg-primary/10 dark:bg-primary/20 text-primary',
    open: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    progress:
        'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    resolved:
        'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    closed: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
    roles: 'bg-primary/10 dark:bg-primary/20 text-primary',
    permissions: 'bg-primary/10 dark:bg-primary/20 text-primary',
    users: 'bg-primary/10 dark:bg-primary/20 text-primary',
    pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
};

type StatCardProps = {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    variant?: StatCardVariant;
    className?: string;
};

export function StatCard({
    title,
    value,
    icon: Icon,
    variant = 'primary',
    className,
}: StatCardProps) {
    const styles = variantStyles[variant];

    return (
        <div
            className={cn(
                'rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm',
                className
            )}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {title}
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                        {value}
                    </p>
                </div>
                {Icon && (
                    <div
                        className={cn(
                            'flex size-12 items-center justify-center rounded-lg',
                            styles.bg,
                            styles.text
                        )}
                    >
                        <Icon className="size-6" />
                    </div>
                )}
            </div>
        </div>
    );
}
