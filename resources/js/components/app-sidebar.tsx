import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { isMobile, openMobile, setOpenMobile } = useSidebar();
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    const checkScreenSize = () => {
        const large = typeof window !== 'undefined' && window.innerWidth >= 1024;
        setIsLargeScreen(large);
        if (large) {
            setOpenMobile(false);
        }
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, [setOpenMobile]);

    const asideVisible = openMobile || isLargeScreen;

    return (
        <div
            className={cn('shrink-0', isMobile ? 'w-0' : 'w-64')}
            data-variant="inset"
            data-side="right"
        >
            {/* Overlay للموبايل */}
            {isMobile && (
                <div
                    role="presentation"
                    aria-hidden
                    onClick={() => setOpenMobile(false)}
                    className={cn(
                        'fixed inset-0 z-40 bg-gray-900/50 transition-opacity duration-300 ease-linear lg:hidden',
                        openMobile
                            ? 'opacity-100 pointer-events-auto'
                            : 'opacity-0 pointer-events-none'
                    )}
                />
            )}

            {/* Aside */}
            <aside
                dir="rtl"
                className={cn(
                    'top-0 right-0 z-50 w-64 h-screen overflow-y-auto bg-white dark:bg-gray-800 shadow-sm transition-transform duration-300 ease-in-out',
                    isMobile ? 'fixed' : 'sticky',
                    isMobile && (asideVisible ? 'translate-x-0' : 'translate-x-full')
                )}
                style={{ display: 'block' }}
            >
                <div className="flex h-full w-full flex-col">
                    <header className="flex shrink-0 flex-col gap-2 border-b border-sidebar-border/50 p-2">
                        <Link
                            href={dashboard.url()}
                            prefetch
                            className="flex items-center gap-2 rounded-lg p-2 hover:bg-sidebar-accent"
                        >
                            <AppLogo />
                        </Link>
                    </header>

                    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
                        <NavMain />
                    </div>

                    <footer className="flex shrink-0 flex-col gap-2 border-t border-sidebar-border/50 p-2">
                        <NavUser />
                    </footer>
                </div>
            </aside>
        </div>
    );
}
