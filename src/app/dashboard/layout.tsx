/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { toast } from "keep-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCustomerTraffic, setLineChartData, setTopProduct } from "@/redux/slices/commonSlice";
import { setAccountData, setAdminData } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";
import { setCustomer } from "@/redux/slices/customerSlice";
import { setOrder, setOrderMonthlyData } from "@/redux/slices/orderSlice";
import { setProduct, setProductMonthlyData } from "@/redux/slices/productsSlice";

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

        const data = await response.json();
        if (!data) {
            throw new Error("No data received from API");
        }

        return data;
    } catch (error: unknown) {
        const e = error as any;
        toast.error(e.message || "An unknown error occurred.", { position: "top-right" });
        throw error;
    }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isData, setIsData] = useState(true);
    const { accountData } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("Token not received. Redirecting to login.", { position: "top-right" });
            setTimeout(() => router.push("/"), 2000);
            return;
        }

        const fetchAllData = async () => {
            try {
                const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
                const [
                    dashboardData,
                    customerData,
                    orderData,
                    productData,
                ] = await Promise.all([
                    fetchData(`${baseURL}/api/auth/dashboard`, token),
                    fetchData(`${baseURL}/api/auth/customer`, token),
                    fetchData(`${baseURL}/api/auth/order`, token),
                    fetchData(`${baseURL}/api/auth/product`, token),
                    fetchData(`${baseURL}/api/auth/analysis`, token),
                ]);

                dispatch(setAccountData(dashboardData.admin));
                dispatch(setLineChartData(dashboardData.lineChartData));
                // dispatch(setPieChartData(dashboardData.pieChartData));
                dispatch(setTopProduct(dashboardData.topProductData));
                dispatch(setCustomerTraffic(dashboardData.CustomerTrafficData));
                dispatch(setCustomer(customerData));
                dispatch(setOrder(orderData.orders));
                dispatch(setOrderMonthlyData(orderData.MonthlyOrders));
                dispatch(setProduct(productData.products));
                dispatch(setProductMonthlyData(productData.ProductStats));

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [dispatch, router, accountData]);

    useEffect(() => {
        if (isData && accountData) {
            dispatch(setAdminData({
                adminID: accountData.adminID,
                email: accountData.email,
                firstName: accountData.firstName,
                lastName: accountData.lastName,
                role: accountData.role,
                isActive: accountData.isActive,
                profileImage: accountData.profileImage,
            }));
            setIsData(false);
        }
    }, [isData, accountData, dispatch]);

    return isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-[#263445] z-50">
            <div className="w-12 h-12 rounded-full border-[0.2rem] border-gray-300  border-t-orange-500 animate-spin"></div>
        </div>
    ) : (
        <div className="flex h-full p-4">
            <div className="w-64 fixed h-screen">
                <Sidebar />
            </div>
            <div className="ml-64 flex-1 flex flex-col overflow-hidden h-full">
                <Header />
                <main className="overflow-y-auto flex-1 gap-4 mt-4">{children}</main>
            </div>
        </div>
    );
}