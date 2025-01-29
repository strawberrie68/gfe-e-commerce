import React from 'react';
import { AppProps } from 'next/app';
import ToastContextProvider from '@/context/ToastContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ToastContextProvider>
            <Component {...pageProps} />
        </ToastContextProvider>
    );
};

export default MyApp;
