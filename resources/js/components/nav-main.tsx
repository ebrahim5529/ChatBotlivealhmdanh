import { Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Headphones,
    HelpCircle,
    LayoutGrid,
    LineChart,
    ListChecks,
    Ticket,
    FileText,
    Folder,
    Plus,
    Layers,
    BookOpen,
    ShoppingBag,
    User,
    UserPlus,
    Shield,
    MessageCircle,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';

const PERSIST_PREFIX = 'admin_sidebar_';

function usePersistedOpen(
    key: string,
    initialOpen: boolean,
    currentPathMatches: boolean
) {
    const storageKey = `${PERSIST_PREFIX}${key}`;

    const [open, setOpenState] = useState(() => {
        if (typeof window === 'undefined') return initialOpen;
        const stored = localStorage.getItem(storageKey);
        if (stored !== null) return stored === 'true';
        return initialOpen;
    });

    useEffect(() => {
        if (currentPathMatches && !open) {
            setOpenState(true);
        }
    }, [currentPathMatches, open]);

    const setOpen = useCallback(
        (value: boolean | ((prev: boolean) => boolean)) => {
            setOpenState((prev) => {
                const next = typeof value === 'function' ? value(prev) : value;
                if (typeof window !== 'undefined') {
                    localStorage.setItem(storageKey, String(next));
                }
                return next;
            });
        },
        [storageKey]
    );

    return [open, setOpen] as const;
}

type NavSubItem = {
    label: string;
    href: string;
    icon: React.ElementType;
    pathMatch?: string;
};

type NavSection = {
    key: string;
    label: string;
    icon: React.ElementType;
    pathPrefix: string;
    items: NavSubItem[];
};

const navSections: NavSection[] = [
    {
        key: 'dashboard',
        label: 'الرئيسية',
        icon: LayoutGrid,
        pathPrefix: '/dashboard',
        items: [
            {
                label: 'لوحة التحكم',
                href: dashboard.url(),
                icon: LineChart,
            },
        ],
    },
    {
        key: 'offers',
        label: 'العروض',
        icon: ShoppingBag,
        pathPrefix: '/admin/sales',
        items: [
            { label: 'إدارة العروض', href: '/admin/sales/packages', icon: Layers },
            { label: 'ادارة التصنيفات', href: '/admin/sales/materials', icon: BookOpen },
        ],
    },
    {
        key: 'users',
        label: 'المستخدمون',
        icon: User,
        pathPrefix: '/admin/users',
        items: [
            { label: 'جميع المستخدمين', href: '/admin/users', icon: User },
            { label: 'إضافة مستخدم', href: '/admin/users/create', icon: UserPlus },
        ],
    },
    {
        key: 'roles',
        label: 'الصلاحيات',
        icon: Shield,
        pathPrefix: '/admin/roles',
        items: [
            {
                label: 'الأدوار والصلاحيات',
                href: '/admin/roles',
                icon: Shield,
            },
        ],
    },
    {
        key: 'bot_responses',
        label: 'ردود الشتات',
        icon: MessageCircle,
        pathPrefix: '/admin/bot-responses',
        items: [
            {
                label: 'ردود الشتات',
                href: '/admin/bot-responses',
                icon: MessageCircle,
            },
        ],
    },
];

function NavSectionItem({
    section,
    isCurrentUrl,
    currentPath,
}: {
    section: NavSection;
    isCurrentUrl: (href: string) => boolean;
    currentPath: string;
}) {
    const currentPathMatches = currentPath.startsWith(section.pathPrefix);

    const [open, setOpen] = usePersistedOpen(
        `${section.key}_open`,
        currentPathMatches,
        currentPathMatches
    );

    const Icon = section.icon;

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <CollapsibleTrigger asChild>
                <button
                    type="button"
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 group flex w-full items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors"
                >
                    <div className="flex items-center">
                        <Icon className="ml-3 h-5 w-5" />
                        <span>{section.label}</span>
                    </div>
                    <ChevronDown
                        className={cn(
                            'h-5 w-5 text-gray-400 transition-transform',
                            open && 'rotate-180'
                        )}
                    />
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="mr-6 mt-1 space-y-1">
                    {section.items.map((item) => {
                        const ItemIcon = item.icon;
                        const active = isCurrentUrl(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                prefetch
                                className={cn(
                                    'flex items-center px-3 sm:px-4 py-2 text-sm rounded-lg transition-colors',
                                    active
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-primary/10 hover:text-primary dark:hover:bg-gray-700'
                                )}
                            >
                                <ItemIcon className="ml-2 h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}

export function NavMain() {
    const { isCurrentUrl, currentUrl } = useCurrentUrl();
    const { auth } = usePage().props as any;

    // Filter sections based on user permissions
    const filteredSections = navSections.filter((section) => {
        // Dashboard is always visible
        if (section.key === 'dashboard') return true;

        // Check if user has 'read' permission for this section
        const menuKey = section.key;
        const permissions: Record<string, string[]> = auth.permissions || {};

        // Map section keys to permission menu keys
        const permissionMap: Record<string, string> = {
            'offers': 'packages',
            'users': 'users',
            'roles': 'roles',
            'bot_responses': 'bot-responses',
        };

        const permissionKey = permissionMap[menuKey] || menuKey;
        return permissions[permissionKey]?.includes('read') || false;
    });

    return (
        <nav className="mt-8">
            <div className="space-y-1 px-4">
                {filteredSections.map((section) => (
                    <NavSectionItem
                        key={section.key}
                        section={section}
                        isCurrentUrl={isCurrentUrl}
                        currentPath={currentUrl}
                    />
                ))}
            </div>
        </nav>
    );
}
