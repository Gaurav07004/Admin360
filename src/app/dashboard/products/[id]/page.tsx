"use client";

import React, { useRef, useMemo } from "react";
import { Trash } from 'phosphor-react';
import { useDispatch, useSelector } from "react-redux";
import { setDrawerStatus } from "@/redux/slices/productsSlice";
import { RootState } from "@/redux/store";
import { HiArrowLongRight } from "react-icons/hi2";
import { PiStarFill, PiStarHalfFill } from "react-icons/pi";
import { HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown } from "react-icons/hi2";
import { Divider, toast } from "keep-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CustomerDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { drawerStatus, productDrawerStatus, selectedProduct } = useSelector((state: RootState) => state.product);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const previousCount = selectedProduct?.previousCount || 0;
    const purchaseCount = selectedProduct?.purchaseCount || 0;
    const profitOrLoss = previousCount - purchaseCount;
    const profitOrLossPercentage = ((profitOrLoss / purchaseCount) * 100).toFixed(1);
    const isProfit = profitOrLoss > 0;

    const renderStars = useMemo(() => {
        const stars = [];
        const ratingValue = selectedProduct?.rating || 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(ratingValue)) {
                stars.push(
                    <PiStarFill
                        key={i}
                        className="text-[#ff8127d0] dark:text-yellow-400 text-lg"
                    />
                );
            } else if (i - 0.5 <= ratingValue) {
                stars.push(
                    <PiStarHalfFill
                        key={i}
                        className="text-[#ff8127d0] dark:text-yellow-400 text-lg"
                    />
                );
            } else {
                stars.push(
                    <PiStarFill
                        key={i}
                        className="text-gray-300 dark:text-gray-600 text-lg"
                    />
                );
            }
        }
        return stars;
    }, [selectedProduct]);


    const handleDeleteProduct = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.error('Token not found. Redirecting to login.');
            setTimeout(() => router.push('/login'), 1000);
            return;
        }

        try {
            const response = await fetch(`/api/auth/${selectedProduct?.productID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success("Product added successfully.", { position: "top-right" });
                dispatch(setDrawerStatus(!drawerStatus));
                window.location.reload();
            } else {
                const errorMessage =
                    response.status === 401
                        ? "Session expired. Please log in again."
                        : `Unable to connect. Please try again in a few moments`;

                toast.error(errorMessage, { position: "top-right" });
                setTimeout(() => router.push("/"), 1000);
            }
        } catch (error) {
            toast.error("Unable to connect. Please check your network.", { position: "top-right" });
            setTimeout(() => router.push("/"), 1000);
        }
    };

    const renderCustomerPreview = () => (
        <section className="flex items-center justify-between sticky top-0 z-10 bg-white dark:bg-[#263445] p-4 border-b-[0.5px] border-gray-200 dark:border-gray-500">
            <div className="flex flex-col justify-normal items-start">
                <div className="text-gray-600 dark:text-gray-300 text-[1.2rem] font-semibold uppercase tracking-wide">#{selectedProduct?.productID || "Loading..."}</div>
                <div className="text-[0.7rem] font-medium text-slate-600 dark:text-gray-300">Product details</div>
            </div>
            <div className="flex items-center space-x-2">
                <div
                    className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-500 hover:bg-orange-100 dark:hover:bg-gray-400 rounded-lg transition duration-300"
                    onClick={() => dispatch(setDrawerStatus(!drawerStatus))}>
                    <HiArrowLongRight className="w-5 h-5 text-gray-500 dark:text-gray-900" />
                </div>
            </div>
        </section>
    );

    const renderCustomerInfo = () => (
        <div className="p-4 bg-white dark:bg-[#263445] rounded-lg space-y-4">
            <div className="flex justify-between items-center">
                <div className="text-[#FF6500] font-bold text-xs uppercase">Overview</div>
                <div className="p-2 bg-red-100 rounded-md cursor-pointer" onClick={handleDeleteProduct}>
                    <Trash
                        size={16}
                        color="red"
                    />
                </div>
            </div>
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center space-x-3">
                    <Image
                        src={selectedProduct?.productImage || "/placeholder.png"}
                        alt={selectedProduct?.productName || "Product Image"}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain rounded-lg border-2 border-gray-200 bg-slate-100 dark:bg-slate-500 p-1"
                    />
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{selectedProduct?.productName || "Loading..."}</h3>
                        <p className="text-[0.8rem] font-medium text-slate-500 dark:text-gray-400">{selectedProduct?.category || "N/A"}</p>
                    </div>
                </div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-300">₹{selectedProduct?.price || 0}</p>
            </div>
            <div className="flex items-center justify-between gap-1">
                <span
                    className={`text-sm font-semibold text-gray-500 px-3 py-1 rounded-md
                    ${selectedProduct?.stockStatus === "Available"
                            ? "bg-green-100 text-green-500 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-700"
                            : selectedProduct?.stockStatus === "Out of Stock"
                                ? "bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-700"
                                : "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:hover:bg-yellow-700"
                        }
                    `}
                >
                    {selectedProduct?.stockStatus}
                </span>
                <div className="flex items-center gap-1">
                    {renderStars}
                    <span className="text-[0.9rem] font-medium text-slate-500  dark:text-gray-300 ml-1">{selectedProduct?.rating || "N/A"}</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md px-3 py-2 space-x-2">
                    <span className="text-[0.8rem] font-semibold text-gray-700 dark:text-gray-300">{selectedProduct?.purchaseCount || 0} Sold</span>
                    <div className={`flex items-center ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
                        {isProfit ? (
                            <HiOutlineArrowTrendingUp size={14} />
                        ) : (
                            <HiOutlineArrowTrendingDown size={14} />
                        )}
                        <span className="text-[0.8rem] font-medium">
                            {isProfit ? `+${profitOrLossPercentage}%` : `${profitOrLossPercentage}%`}
                        </span>
                    </div>
                </div>
                <div className="flex items-center bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md px-3 py-2">
                    <span className="text-[0.8rem] font-semibold text-gray-700 dark:text-gray-300">
                        {selectedProduct?.stockQuantity || 0} Remaining
                    </span>
                </div>

                <div className="flex items-center bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md px-3 py-2">
                    <span className="text-[0.8rem] font-semibold text-gray-700 dark:text-gray-300">
                        {selectedProduct?.viewsCount || 0} Total View
                    </span>
                </div>

                <div className="flex items-center bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md px-3 py-2">
                    <span className="text-[0.8rem] font-semibold text-gray-700 dark:text-gray-300">
                        {selectedProduct?.wishlistCount || 0} Wishlist
                    </span>
                </div>

                <div className="flex items-center bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-md px-3 py-2">
                    <span className="text-[0.8rem] font-semibold text-gray-700 dark:text-gray-300">
                        {selectedProduct?.subcategory || 0}
                    </span>
                </div>
            </div>
        </div>
    );

    const renderProductInfo = () => {
        return (
            <>
                <div className="p-4 bg-white dark:bg-[#263445] rounded-lg space-y-3">
                    <div className="text-[#FF6500] font-bold text-xs uppercase">Description</div>
                    <p className="text-[0.85rem] font-semibold text-gray-700 dark:text-gray-300">{selectedProduct?.description}</p>
                    <div className="flex items-center gap-4">
                        {selectedProduct?.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="rounded-md px-3 py-2 bg-orange-50 text-orange-500 text-[0.8rem] font-semibold
                                    dark:bg-orange-900 dark:text-orange-300"
                            >
                                {tag}
                            </span>

                        ))}
                    </div>
                </div>
                <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-2" />
                <div className="p-4 bg-white dark:bg-[#263445] rounded-lg space-y-3">
                    <div className="text-[#FF6500] font-bold text-xs uppercase">supplier company</div>
                    {[
                        { title: "Supplier Company", value: selectedProduct?.supplier.name },
                        { title: "Contact Detail", value: selectedProduct?.supplier.contact },
                        { title: "Email Address", value: selectedProduct?.supplier.email },
                    ].map((item, index) => (
                        <div key={index} className={`flex items-center justify-between w-[60%] py-1`}>
                            <span className="w-1/2 text-[0.85rem] font-semibold text-gray-700 dark:text-gray-300">{item.title}</span>
                            <span className="w-1/2 text-[0.85rem] font-semibold text-gray-500 dark:text-gray-400">{item.value}</span>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    const renderPreview = () => <section className="sticky bottom-0 z-10 bg-white dark:bg-[#263445] w-full h-7"></section>;

    return (
        <>
            {drawerStatus && <div ref={overlayRef} className="fixed inset-0 bg-black bg-opacity-20 z-10" />}
            <div
                ref={drawerRef}
                className={`fixed top-3 bottom-3 ${productDrawerStatus === true ? 'right-0' : 'right-3'} w-full max-w-[30rem] rounded-xl bg-white dark:bg-[#263445] shadow-md text-black transform overflow-auto ${drawerStatus ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-500 ease-in-out z-20`}
            >
                {renderCustomerPreview()}
                <div className="overflow-auto">
                    {renderCustomerInfo()}
                    <Divider className="border-t-[0.5px] border-gray-200 dark:border-gray-500 mt-2" />
                    {renderProductInfo()}
                </div>
                {renderPreview()}
            </div>
        </>
    );
};

export default CustomerDetailPage;
