"use client";

import React, { useEffect, useState } from "react";
import { toast } from "keep-react";
import Chart from "@/components/Chart";
import RecentOrder from "@/components/RecentOrder";
import RightBar from "@/components/rightbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCustomerTraffic, setLineChartData, setPieChartData, setForm } from "@/redux/slices/commonSlice";
import { setAdminData } from "@/redux/slices/adminSlice";

function Page() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { form } = useSelector((state: RootState) => state.menu);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                toast.error("Token not received. Redirecting to login.", { position: "top-right" });
                setTimeout(() => (window.location.href = "/"), 2000);
                return;
            }

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
                    const [firstName, lastName] = data.admin.name.split(" ");

                    const adminDetails = {
                        email: data.admin.email,
                        adminID: data.admin.adminID,
                        firstName,
                        lastName,
                        role: data.admin.role,
                    };

                    dispatch(setForm({ ...form, ...adminDetails }));
                    dispatch(setAdminData(adminDetails));
                    dispatch(setLineChartData(data.lineChartData));
                    dispatch(setPieChartData(data.pieChartData));
                    dispatch(setCustomerTraffic(data.CustomerTrafficData));
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

        fetchData();
    }, [dispatch]);



    return isLoading ? (
        <div className="fixed top-[50%] left-[55%] flex justify-center items-center">
            <div className="w-12 h-12 rounded-full border-[0.2rem] border-gray-300 border-t-orange-500 animate-spin"></div>
        </div>
    ) : (
        <section className="flex gap-5 animate-fadeIn">
            <section className="w-[70%] flex flex-col gap-5">
                <Chart />
                <RecentOrder />
            </section>
            <section className="w-[30%] flex gap-5">
                <RightBar />
            </section>
        </section>
    );
}

export default Page;
