import { toast as toastify, type ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    rtl: true,
};

export const toast = {
    success: (message: string, options?: ToastOptions) => {
        toastify.success(message, { ...defaultOptions, ...options });
    },

    error: (message: string, options?: ToastOptions) => {
        toastify.error(message, { ...defaultOptions, autoClose: 5000, ...options });
    },

    info: (message: string, options?: ToastOptions) => {
        toastify.info(message, { ...defaultOptions, ...options });
    },

    warning: (message: string, options?: ToastOptions) => {
        toastify.warning(message, { ...defaultOptions, ...options });
    },

    crud: {
        created: (entity: string) => toast.success(`تم إضافة ${entity} بنجاح`),
        updated: (entity: string) => toast.success(`تم تحديث ${entity} بنجاح`),
        deleted: (entity: string) => toast.success(`تم حذف ${entity} بنجاح`),
        error: (action: string, message?: string) =>
            toast.error(message ?? `حدث خطأ أثناء ${action}`),
    },
};
