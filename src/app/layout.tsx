import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import StoreProvider from './StoreProvider';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ToastWrapper } from 'keep-react';

const manrope = localFont({
  src: './fonts/Manrope.ttf',
  variable: '--font-geist-sans',
  weight: '100 500',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased h-screen overflow-hidden`}>
        <StoreProvider>
          <ToastWrapper
            toastOptions={{
              classNames: {
                toast: 'dark:bg-metal-900 border dark:border-metal-800 border-green-400 bg-white py-5 px-6',
                title: 'text-metal-900 dark:text-white',
                description: 'dark:text-metal-300 text-metal-600',
                actionButton: 'dark:bg-metal-800 bg-metal-900 text-white',
                cancelButton: 'dark:bg-metal-800 bg-metal-900 text-white',
                closeButton: 'dark:bg-metal-800 bg-metal-900 text-white',
                error: 'text-error-500',
                success: 'text-success-500',
                warning: 'text-warning-500',
                info: 'text-primary-500',
              },
            }}
          />

          <div className="flex h-full p-4">
            <div className="w-64 fixed h-screen">
              <Sidebar />
            </div>
            <div className="ml-64 flex-1 flex flex-col overflow-hidden h-full">
              <Header />
              <main className="overflow-y-auto flex-1 gap-5 mt-4">{children}</main>
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
