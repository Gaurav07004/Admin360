/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { toast } from "keep-react";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCustomerTraffic, setLineChartData, setTopProduct } from "@/redux/slices/commonSlice";
import { setAdminData, setAccountData } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";
import { setOrder } from "@/redux/slices/orderSlice";

const fetchData = async (url: string, token: string) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        return await response.json();
    } catch (error: any) {
        toast.error(error.message || "An unknown error occurred.", { position: "top-right" });
        throw error;
    }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { accountData } = useSelector((state: RootState) => state.user);

    const fetchDashboardData = useCallback(async (token: string) => {
        try {
            const [dashboardData, orderData] = await Promise.all([
                fetchData(`/api/auth/dashboard`, token),
                fetchData(`/api/auth/order`, token),
            ]);

            dispatch(setAccountData(dashboardData.admin));
            dispatch(setLineChartData(dashboardData.lineChartData));
            dispatch(setTopProduct(dashboardData.topProductData));
            dispatch(setCustomerTraffic(dashboardData.CustomerTrafficData));
            dispatch(setOrder(orderData.orders));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("Token not received. Redirecting to login.", { position: "top-right" });
            setTimeout(() => router.push("/"), 2000);
            return;
        }

        fetchDashboardData(token);
    }, [fetchDashboardData, router]);

    useEffect(() => {
        if (accountData) {
            dispatch(setAdminData({
                adminID: accountData.adminID,
                email: accountData.email,
                firstName: accountData.firstName,
                lastName: accountData.lastName,
                role: accountData.role,
                isActive: accountData.isActive,
                profileImage: accountData.profileImage,
            }));
        }
    }, [accountData, dispatch]);

    return isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-[#263445] z-50">
            <div className="w-12 h-12 rounded-full border-[0.2rem] border-gray-300 border-t-orange-500 animate-spin"></div>
        </div>
    ) : (
        <div className="flex h-full p-4">
            <aside className="w-64 fixed h-screen">
                <Sidebar />
            </aside>
            <div className="ml-64 flex-1 flex flex-col overflow-hidden h-full">
                <Header />
                <main className="overflow-y-auto flex-1 gap-4 mt-4">{children}</main>
            </div>
        </div>
    );
}
