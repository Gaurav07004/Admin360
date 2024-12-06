"use client";

import Image, { StaticImageData } from "next/image";
import Product_1 from "../Assets/Dell Inspiron 15 Laptop.png";
import Product_2 from "../Assets/Targus Laptop Sleeve.webp";
import Product_3 from "../Assets/Apple iPhone 15.webp";
import Product_4 from "../Assets/Samsung Galaxy Watch 5.webp";

interface Product {
    name: string;
    price: string;
    sold: string;
    img: StaticImageData;
}

const products: Product[] = [
    { name: "Dell Inspiron 15 Laptop", price: "₹50000", sold: "917", img: Product_1 },
    { name: "Targus Laptop Sleeve", price: "₹800", sold: "804", img: Product_2 },
    { name: "Apple iPhone 15", price: "₹80000", sold: "738", img: Product_3 },
    { name: "Samsung Galaxy Watch 5", price: "₹8000", sold: "684", img: Product_4 },
];

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <div className="w-full py-4 px-5 bg-white rounded-[1rem]">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold text-gray-600">Top Products</p>
                </div>
                <ul>
                    {products.map((product, index) => (
                        <li key={index} className="p-4 mb-2 w-full bg-gray-100 rounded-lg border border-gray-300">
                            <div className="flex items-center w-full">
                                <Image
                                    src={product.img}
                                    alt={product.name}
                                    className="w-12 h-12 object-contain rounded-md"
                                />
                                <div className="ml-4 flex-1">
                                    <div className="flex justify-between w-full">
                                        <p className="text-sm font-semibold text-gray-500">{product.name}</p>
                                        <span className="text-sm font-semibold text-gray-500">{product.price}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{product.sold} sold</p>
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
