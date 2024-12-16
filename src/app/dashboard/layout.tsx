'use client'

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex h-full p-4">
            <div className="w-64 fixed h-screen">
                <Sidebar />
            </div>
            <div className="ml-64 flex-1 flex flex-col overflow-hidden h-full">
                <Header />
                <main className="overflow-y-auto flex-1 gap-5 mt-4">{children}</main>
            </div>
        </div>
    );
}
