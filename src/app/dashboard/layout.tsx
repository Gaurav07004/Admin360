/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { toast } from "keep-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCustomerTraffic, setLineChartData, setTopProduct } from "@/redux/slices/commonSlice";
import { setAdminData, setAccountData } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const { accountData } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                toast.error("Authentication is missing. Redirecting to login.", {
                    position: "top-right",
                });
                setTimeout(() => router.push("/"), 1000);
                return;
            }

            try {
                const response = await fetch(`/api/auth/dashboard`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorMessage =
                        response.status === 401
                            ? "Session expired. Please log in again."
                            : `Unable to connect. Please try again in a few moments`;

                    toast.error(errorMessage, { position: "top-right" });
                    setTimeout(() => router.push("/"), 1000);
                    throw new Error(errorMessage);
                }

                const dashboardData = await response.json();

                dispatch(setAccountData(dashboardData.admin));
                dispatch(setLineChartData(dashboardData.lineChartData));
                dispatch(setTopProduct(dashboardData.topProductData));
                dispatch(setCustomerTraffic(dashboardData.CustomerTrafficData));
            } catch (error: any) {
                console.error("Error fetching dashboard data:", error);
                toast.error(
                    "Unable to connect. Please check your network.",
                    { position: "top-right" }
                );
                setTimeout(() => router.push("/"), 1000);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch, router]);

    useEffect(() => {
        if (accountData) {
            dispatch(
                setAdminData({
                    adminID: accountData.adminID,
                    email: accountData.email,
                    firstName: accountData.firstName,
                    lastName: accountData.lastName,
                    role: accountData.role,
                    isActive: accountData.isActive,
                    profileImage: accountData.profileImage,
                })
            );
        }
    }, [accountData, dispatch]);

    return isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-[#263445] z-50">
            <div className="w-12 h-12 rounded-full border-[0.2rem] border-gray-300 border-t-orange-500 animate-spin"></div>
        </div>
    ) : (
        <div className="flex h-full p-4">
            <aside className="w-64">
                <Sidebar />
            </aside>
            <div className="flex-1 flex flex-col overflow-hidden h-full">
                <Header />
                <main className="overflow-y-auto flex-1 gap-4 mt-4">{children}</main>
            </div>
        </div>
    );
}
