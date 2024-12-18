"use client";

import React, { useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerStatus } from "@/redux/slices/productsSlice";
import { RootState } from "@/redux/store";
import { HiArrowLongRight } from "react-icons/hi2";
import { PiStarFill, PiStarHalfFill } from "react-icons/pi";
import { HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown } from "react-icons/hi2";
import { Divider } from "keep-react";
import Image from "next/image";

const CustomerDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const { drawerStatus, selectedProduct } = useSelector((state: RootState) => state.product);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const percentageChange = ((selectedProduct?.purchaseCount - 500) / 500 * 100).toFixed(1);
    const isPositive = parseFloat(percentageChange) > 0;

    const renderStars = useMemo(() => {
        const stars = [];
        const ratingValue = selectedProduct?.rating || 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(ratingValue)) {
                stars.push(<PiStarFill key={i} className="text-[#ff8127d0] text-lg" />);
            } else if (i - 0.5 <= ratingValue) {
                stars.push(<PiStarHalfFill key={i} className="text-[#ff8127d0] text-lg" />);
            } else {
                stars.push(<PiStarFill key={i} className="text-gray-300 text-lg" />);
            }
        }
        return stars;
    }, [selectedProduct]);

    const renderCustomerPreview = () => (
        <section className="flex items-center justify-between sticky top-0 z-10 bg-white p-4 border-b-[0.5px] border-gray-200">
            <div className="flex flex-col justify-normal items-start">
                <div className="text-gray-600 text-[1.2rem] font-semibold uppercase tracking-wide">#{selectedProduct?.productID || "Loading..."}</div>
                <div className="text-[0.7rem] font-medium text-slate-600">Product details</div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-orange-100 rounded-lg transition duration-300" onClick={() => dispatch(setDrawerStatus(!drawerStatus))}>
                    <HiArrowLongRight className="w-5 h-5 text-gray-600" />
                </div>
            </div>
        </section>
    );

    const renderCustomerInfo = () => (
        <div className="p-4 bg-white rounded-lg space-y-4">
            <div className="text-[#FF6500] font-bold text-xs uppercase">Overview</div>
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center space-x-3">
                    <Image
                        src={selectedProduct?.productImage || "/placeholder.png"}
                        alt={selectedProduct?.productName || "Product Image"}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain rounded-lg border-2 border-gray-200 bg-slate-100 p-1"
                    />
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700">{selectedProduct?.productName || "Loading..."}</h3>
                        <p className="text-[0.8rem] font-medium text-slate-500">{selectedProduct?.category || "N/A"}</p>
                    </div>
                </div>
                <p className="text-sm font-semibold text-gray-800">₹{selectedProduct?.price || 0}</p>
            </div>
            <div className="flex items-center justify-between gap-1">
                <span
                    className={`text-sm font-semibold text-gray-500 px-3 py-1 rounded-md ${selectedProduct?.stockStatus === "Available"
                        ? "bg-green-100 text-green-500 hover:bg-green-200 px-2 py-1 w-fit"
                        : selectedProduct?.stockStatus === "Out of Stock"
                            ? "bg-red-100 text-red-500 hover:bg-red-200 px-2 py-1 w-fit"
                            : "bg-yellow-100 text-yellow-500 hover:bg-yellow-200 px-2 py-1 w-fit"
                        }`}
                >
                    {selectedProduct?.stockStatus}
                </span>
                <div className="flex items-center gap-1">
                    {renderStars}
                    <span className="text-[0.9rem] font-medium text-slate-500 ml-1">{selectedProduct?.rating || "N/A"}</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2 space-x-2">
                    <span className="text-[0.8rem] font-semibold text-gray-700">{selectedProduct?.purchaseCount || 0} Sold</span>
                    <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? (
                            <HiOutlineArrowTrendingUp size={14} />
                        ) : (
                            <HiOutlineArrowTrendingDown size={14} />
                        )}
                        <span className="text-[0.8rem] font-medium">
                            {isPositive ? `+${percentageChange}%` : `${percentageChange}%`}
                        </span>
                    </div>
                </div>
                <div className="flex items-center  bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">
                    <span className="text-[0.8rem] font-semibold text-gray-700">{selectedProduct?.stockQuantity || 0} Remaining</span>
                </div>
                <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">
                    <span className="text-[0.8rem] font-semibold text-gray-700">{selectedProduct?.viewsCount || 0} Total View</span>
                </div>
                <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">
                    <span className="text-[0.8rem] font-semibold text-gray-700">{selectedProduct?.wishlistCount || 0} Wishlist</span>
                </div>
                <div className="flex items-center bg-gray-100 hover:bg-gray-200 rounded-md px-3 py-2">
                    <span className="text-[0.8rem] font-semibold text-gray-700">{selectedProduct?.subcategory || 0}</span>
                </div>
            </div>
        </div>
    );

    const renderProductInfo = () => {
        return (
            <>
                <div className="p-4 bg-white rounded-lg space-y-3">
                    <div className="text-[#FF6500] font-bold text-xs uppercase">Description</div>
                    <p className="text-[0.85rem] font-semibold text-gray-700">{selectedProduct?.seo?.description}</p>
                    <div className="flex items-center gap-4">
                        {selectedProduct?.tags.map((tag, index) => (
                            <span key={index} className="rounded-md px-3 py-2 bg-orange-50 text-orange-500 text-[0.8rem] font-semibold">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <Divider className="border-t-[0.5px] border-gray-200 mt-2" />
                <div className="p-4 bg-white rounded-lg space-y-3">
                    <div className="text-[#FF6500] font-bold text-xs uppercase">supplier company</div>
                    {[
                        { title: "Supplier Company", value: selectedProduct?.supplier.name },
                        { title: "Contact Detail", value: selectedProduct?.supplier.contact },
                        { title: "Email Address", value: selectedProduct?.supplier.email },
                    ].map((item, index) => (
                        <div key={index} className={`flex items-center justify-between w-[60%] py-1`}>
                            <span className="w-1/2 text-[0.85rem] font-semibold text-gray-700">{item.title}</span>
                            <span className="w-1/2 text-[0.85rem] font-semibold text-gray-500">{item.value}</span>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    const renderPreview = () => <section className="sticky bottom-0 z-10 bg-white w-full h-7"></section>;

    return (
        <>
            {drawerStatus && <div ref={overlayRef} className="fixed inset-0 bg-black bg-opacity-20 z-10" />}
            <div
                ref={drawerRef}
                className={`fixed top-3 bottom-3 right-3 w-full max-w-[30rem] rounded-xl bg-white shadow-md text-black transform overflow-auto ${drawerStatus ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-500 ease-in-out z-20`}
            >
                {renderCustomerPreview()}
                <div className="overflow-auto">
                    {renderCustomerInfo()}
                    <Divider className="border-t-[0.5px] border-gray-200 mt-2" />
                    {renderProductInfo()}
                </div>
                {renderPreview()}
            </div>
        </>
    );
};

export default CustomerDetailPage;
