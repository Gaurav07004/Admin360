"use client";

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductDrawerStatus } from "@/redux/slices/productsSlice";
import { RootState } from "@/redux/store";
import { HiArrowLongRight } from "react-icons/hi2";
// import { PiStarFill, PiStarHalfFill } from "react-icons/pi";
// import { HiOutlineArrowTrendingUp, HiOutlineArrowTrendingDown } from "react-icons/hi2";
// import { Divider } from "keep-react";
// import Image from "next/image";

const CustomerDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const { productDrawerStatus } = useSelector((state: RootState) => state.product);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const renderCustomerPreview = () => (
        <section className="flex items-center justify-between sticky top-0 z-10 bg-white p-4 border-b-[0.5px] border-gray-200">
            <div className="flex flex-col justify-normal items-start">
                <div className="text-[0.7rem] font-medium text-slate-600">Product details</div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-orange-100 rounded-lg transition duration-300" onClick={() => dispatch(setProductDrawerStatus(!productDrawerStatus))}>
                    <HiArrowLongRight className="w-5 h-5 text-gray-600" />
                </div>
            </div>
        </section>
    );

    const renderPreview = () => <section className="sticky bottom-0 z-10 bg-white w-full h-7"></section>;

    return (
        <>
            {productDrawerStatus && <div ref={overlayRef} className="fixed inset-0 bg-black bg-opacity-20 z-10" />}
            <div
                ref={drawerRef}
                className={`fixed top-3 bottom-3 right-5 w-full max-w-[30rem] rounded-xl bg-white shadow-md text-black transform overflow-auto ${productDrawerStatus ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-500 ease-in-out z-20`}
            >
                {renderCustomerPreview()}
                {/* <div className="overflow-auto">
                    {renderCustomerInfo()}
                    <Divider className="border-t-[0.5px] border-gray-200 mt-2" />
                    {renderProductInfo()}
                </div> */}
                {renderPreview()}
            </div>
        </>
    );
};

export default CustomerDetailPage;
