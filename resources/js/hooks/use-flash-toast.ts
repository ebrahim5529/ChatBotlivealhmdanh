import { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from '@/lib/toast';

const DEBOUNCE_MS = 100;

export function useFlashToast(): void {
    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
            info?: string;
        };
    };

    const shownRef = useRef<{ key: string; time: number } | null>(null);

    useEffect(() => {
        const key = `${flash?.success ?? ''}|${flash?.error ?? ''}|${flash?.info ?? ''}`;
        if (!key || key === '||') return;

        const now = Date.now();
        if (
            shownRef.current?.key === key &&
            now - shownRef.current.time < DEBOUNCE_MS
        ) {
            return;
        }

        shownRef.current = { key, time: now };

        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
        if (flash?.info) toast.info(flash.info);
    }, [flash?.success, flash?.error, flash?.info]);
}
