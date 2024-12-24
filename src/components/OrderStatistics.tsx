"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Dashboard: React.FC = () => {
    const { topProductData } = useSelector((state: RootState) => state.menu);

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <div className="w-full py-4 px-5 bg-white rounded-[1rem]">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold text-gray-600">Top Products</p>
                </div>
                <ul>
                    {topProductData.map((product, index) => (
                        <li key={index} className="p-4 mb-2 w-full bg-gray-100 rounded-lg border border-gray-300">
                            <div className="flex items-center w-full">
                                {/* <Image
                                    src={product.productImage}
                                    alt={product.name}
                                    width={0}
                                    height={0}
                                    className="w-12 h-12 object-contain rounded-md"
                                /> */}
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
            </div>
        </div>
    );
};

export default Dashboard;
