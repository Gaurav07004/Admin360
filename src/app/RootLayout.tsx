'use client';

import './globals.css';
import StoreProvider from './StoreProvider';
import { ToastWrapper } from 'keep-react';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [lastPath, setLastPath] = useState<string>('');

    const checkScreenSize = () => {
        if (window.innerWidth < 1025) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (lastPath !== currentPath) {
            setLastPath(currentPath);
        }

        if (isMobile) {
            if (currentPath !== "/notFound") {
                router.push("/notFound");
            }
        } else {
            if (currentPath === "/notFound" && lastPath !== "/notFound") {
                router.push(lastPath);
            }
        }
    }, [isMobile, lastPath, router]);

    return (
        <html lang="en">
            <body className={`font-sans antialiased h-screen overflow-hidden dark:bg-slate-800`}>
                <StoreProvider>
                    <ToastWrapper
                        richColors={false}
                        toastOptions={{
                            classNames: {
                                toast: 'dark:bg-metal-900 border dark:border-metal-800 bg-white py-5 px-6',
                                title: 'text-metal-900 dark:text-white',
                                description: 'dark:text-metal-300 text-metal-600',
                                actionButton: 'dark:bg-metal-800 bg-metal-900 text-white',
                                cancelButton: 'dark:bg-metal-800 bg-metal-900 text-white',
                                closeButton: 'dark:bg-metal-800 bg-metal-900 text-white',
                                error: 'text-error-500 border-red-400',
                                success: 'text-success-500 border-green-400',
                                warning: 'text-warning-500 border-yellow-400',
                                info: 'text-primary-500 border-blue-400',
                            },
                        }}
                    />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
