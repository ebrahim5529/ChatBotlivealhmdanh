import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type DeleteConfirmDialogProps = {
    trigger: React.ReactNode;
    title: string;
    description: string;
    deleteUrl: string;
    entityName?: string;
};

export function DeleteConfirmDialog({
    trigger,
    title,
    description,
    deleteUrl,
}: DeleteConfirmDialogProps) {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        router.delete(deleteUrl, {
            preserveScroll: true,
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                        <Button variant="outline">إلغاء</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        حذف
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
