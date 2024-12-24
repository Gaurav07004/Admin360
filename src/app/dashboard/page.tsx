"use client";

import React, { useEffect, useState } from "react";
import { toast } from "keep-react";
import Chart from "@/components/Chart";
import RecentOrder from "@/components/RecentOrder";
import RightBar from "@/components/rightbar";
import { useDispatch } from "react-redux";
import { setCustomerTraffic, setLineChartData, setPieChartData, setTopProduct } from "@/redux/slices/commonSlice";

function Page() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("authToken");

            if (!token) {
                toast.error("Token not received. Redirecting to login.", { position: "top-right" });
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/auth/dashboard", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    dispatch(setLineChartData(data.lineChartData));
                    dispatch(setPieChartData(data.pieChartData));
                    dispatch(setTopProduct(data.topProductData));
                    dispatch(setCustomerTraffic(data.CustomerTrafficData));
                } else {
                    toast.error("Failed to fetch data.", { position: "top-right" });
                }
            } catch (error) {
                toast.error("Unable to connect. Please check your network.", { position: "top-right" });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        isLoading ? (
            <div className="flex justify-center items-center h-screen">
                <div className="w-16 h-16 border-8 border-t-8 border-orange-500 border-solid rounded-full animate-spin"></div>
            </div>
        ) : (
            <section className="flex gap-5">
                <section className="w-[70%] flex flex-col gap-5">
                    <Chart />
                    <RecentOrder />
                </section>
                <section className="w-[30%] flex gap-5">
                    <RightBar />
                </section>
            </section>
        )
    );
}

export default Page;
