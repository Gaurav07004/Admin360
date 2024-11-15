"use client";

import Image, { StaticImageData } from "next/image";
import Velvet_Coral_Sofa from "../Assets/Velvet_Coral_Sofa.png";
import Emerald_Velvet_Chair from "../Assets/Emerald_Velvet_Chair.png";
import Rotterdam_Table from "../Assets/Rotterdam_Table.jpeg";
import Yellow_Lamp from "../Assets/Yellow_Lamp.png";

interface Product {
    name: string;
    price: string;
    sold: string;
    img: StaticImageData;
}

const products: Product[] = [
    { name: "Emerald Velvet Chair", price: "$355.90", sold: "917", img: Emerald_Velvet_Chair },
    { name: "Velvet Coral Sofa", price: "$279.00", sold: "804", img: Velvet_Coral_Sofa },
    { name: "Rotterdam Table", price: "$329.95", sold: "738", img: Rotterdam_Table },
    { name: "Yellow Lamp", price: "$315.50", sold: "684", img: Yellow_Lamp },
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
                        <li key={index} className="flex items-center justify-between p-4 mb-[0.55rem] bg-gray-100 rounded-lg border border-gray-300">
                            <div className="flex items-center gap-5">
                                <Image src={product.img} alt={product.name} className="w-10 h-10 object-cover rounded-md" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-500">{product.name}</p>
                                    <p className="text-xs text-gray-500">{product.sold} sold</p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-500">{product.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
