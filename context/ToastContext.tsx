"use client"

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    ReactNode,
} from 'react';

type Toast = {
    show: boolean;
    type: 'success' | 'error' | '',
    message: string;
};

type ToastContextType = {
    toast: Toast;
    showToast: (type: 'success' | 'error', message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastContextProvider');
    }

    const { showToast } = context;

    const error = (message: string) => showToast('error', message);
    const success = (message: string) => showToast('success', message);

    return { error, success };
};

export const useToastContext = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToastContext must be used within a ToastContextProvider');
    }
    return context;
};

// export const useToastContext = () => useContext(ToastContext);


type ToastContextProviderProps = {
    children: ReactNode;
};

const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
    const [toast, setToast] = useState<Toast>({
        show: false,
        type: '',
        message: '',
    });

    const showToast = useCallback((type: 'success' | 'error', message: string) => {
        setToast({
            show: true,
            type,
            message,
        });

        setTimeout(() => {
            setToast({
                show: false,
                type: '',
                message: '',
            });
        }, 10000);
    }, []);

    const value = useMemo(() => {
        return {
            toast,
            showToast,
        };
    }, [toast, showToast]);

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
};

export default ToastContextProvider;
