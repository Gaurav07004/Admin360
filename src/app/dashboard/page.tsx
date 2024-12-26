"use client";

// import React, { useEffect, useState } from "react";
// import { toast } from "keep-react";
import Chart from "@/components/Chart";
import RecentOrder from "@/components/RecentOrder";
import RightBar from "@/components/rightbar";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { setCustomerTraffic, setLineChartData, setPieChartData } from "@/redux/slices/commonSlice";
// import { setAccountData, setAdminData } from "@/redux/slices/adminSlice";
// import { useRouter } from "next/navigation";

function Page() {
    // const dispatch = useDispatch();
    // const router = useRouter();
    // const [isLoading, setIsLoading] = useState(true);
    // const [isData, setIsData] = useState(true);
    // const { accountData } = useSelector((state: RootState) => state.user);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const token = localStorage.getItem("authToken");
    //         if (!token) {
    //             toast.error("Token not received. Redirecting to login.", { position: "top-right" });
    //             setTimeout(() => router.push("/"), 2000);
    //             return;
    //         }

    //         try {
    //             const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    //             const response = await fetch(`${baseURL}/api/auth/dashboard`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`,
    //                 },
    //             });

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 dispatch(setAccountData(data.admin));
    //                 dispatch(setLineChartData(data.lineChartData));
    //                 dispatch(setPieChartData(data.pieChartData));
    //                 dispatch(setCustomerTraffic(data.CustomerTrafficData));
    //             } else if (response.status === 401) {
    //                 toast.error("Session expired. Please login again.", { position: "top-right" });
    //                 setTimeout(() => router.push("/"), 2000);
    //             } else {
    //                 toast.error("Failed to fetch data.", { position: "top-right" });
    //             }
    //         } catch (error) {
    //             console.error("Fetch error:", error);
    //             toast.error("Unable to connect. Please check your network.", { position: "top-right" });
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (isData && accountData) {
    //     dispatch(setAdminData({
    //         adminID: accountData.adminID,
    //         email: accountData.email,
    //         firstName: accountData.firstName,
    //         lastName: accountData.lastName,
    //         role: accountData.role,
    //     }));
    //     setIsData(false)
    // }
    // }, [accountData, adminData, dispatch]);

    // return isLoading ? (
    //     <div className="fixed top-[50%] left-[55%] flex justify-center items-center">
    //         <div className="w-12 h-12 rounded-full border-[0.2rem] border-gray-300 border-t-orange-500 animate-spin"></div>
    //     </div>
    // ) : 
    return (
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
