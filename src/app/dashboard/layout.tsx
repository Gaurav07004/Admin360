'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { toast } from "keep-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCustomerTraffic, setLineChartData, setPieChartData } from "@/redux/slices/commonSlice";
import { setAccountData, setAdminData } from "@/redux/slices/adminSlice";
import { useRouter } from "next/navigation";

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
        const fetchDashboardData = async () => {
            try {
                const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
                const response = await fetch(`${baseURL}/api/auth/dashboard`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setAccountData(data.admin));
                    dispatch(setLineChartData(data.lineChartData));
                    dispatch(setPieChartData(data.pieChartData));
                    dispatch(setCustomerTraffic(data.CustomerTrafficData));
                } else if (response.status === 401) {
                    toast.error("Session expired. Please login again.", { position: "top-right" });
                    setTimeout(() => router.push("/"), 2000);
                } else {
                    toast.error("Failed to fetch data.", { position: "top-right" });
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Unable to connect. Please check your network.", { position: "top-right" });
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [dispatch, router]);

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
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
            <div className="w-12 h-12 rounded-full border-[0.2rem] border-gray-300 border-t-orange-500 animate-spin"></div>
        </div>
    ) : (
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
