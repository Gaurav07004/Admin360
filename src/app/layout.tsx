import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import StoreProvider from './StoreProvider'; // Import the StoreProvider
import Sidebar from '@/components/Sidebar'; // Adjust the path as needed
import Header from '@/components/Header'; // Adjust the path as needed

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
      <body className={`${manrope.variable} antialiased`}>
        <StoreProvider>
          <div className="flex p-4 gap-5 h-[44.2rem]">
            <Sidebar />
            <div className="flex-1 flex flex-col gap-5">
              <Header />
              <main className='overflow-y-auto'>
                {children}
              </main>
            </div>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
