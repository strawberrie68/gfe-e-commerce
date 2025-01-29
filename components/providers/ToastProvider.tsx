"use client"

import ToastContextProvider from '@/context/ToastContext';
import { ReactNode } from 'react';

export default function ToastProvider({ children }: { children: ReactNode }) {
    return (
        <ToastContextProvider>
            {children}
        </ToastContextProvider>
    );
}
