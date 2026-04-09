import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppearance } from '@/hooks/use-appearance';

export function ToastProvider() {
    const { resolvedAppearance } = useAppearance();

    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={resolvedAppearance === 'dark' ? 'dark' : 'light'}
            toastClassName="font-sans"
        />
    );
}
