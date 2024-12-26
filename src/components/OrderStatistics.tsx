"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "keep-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setTopProduct } from "@/redux/slices/commonSlice";
import { Skeleton, SkeletonLine } from 'keep-react'

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { topProductData } = useSelector((state: RootState) => state.menu);
    const { adminData } = useSelector((state: RootState) => state.user);

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
                    dispatch(setTopProduct(data.topProductData));
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
        <div className="flex flex-col items-center gap-5 w-full">
            <div className="w-full py-4 px-5 bg-white rounded-[1rem]">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold text-gray-600">Top Products</p>
                </div>
                {isLoading || topProductData.length === 0 ? (
                    <Skeleton className="max-w-xl space-y-2.5">
                        <SkeletonLine className="h-4 w-full" />
                        <SkeletonLine className="h-4 w-full" />
                        <SkeletonLine className="h-4 w-3/5" />
                        <SkeletonLine className="h-4 w-4/5" />
                        <SkeletonLine className="h-10 w-2/5" />
                    </Skeleton>
                ) : (
                    <ul>
                        {topProductData.map((product, index) => (
                            <li key={index} className="p-4 mb-2 w-full bg-gray-100 rounded-lg border border-gray-300">
                                <div className="flex items-center w-full">
                                    <Image
                                        src={product.TopProductImage}
                                        alt={product.name}
                                        width={0}
                                        height={0}
                                        className="w-12 h-12 object-contain rounded-md"
                                    />
                                    <div className="ml-4 flex-1">
                                        <div className="flex justify-between w-full">
                                            <p className="text-sm font-semibold text-gray-700">{product.name}</p>
                                            <span className="text-sm font-medium text-slate-700">{product.value}</span>
                                        </div>
                                        <p className="text-[0.8rem] font-medium text-slate-500">{product.sold} sold</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
