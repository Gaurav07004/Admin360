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

interface TrafficData {
    ageRange: string;
}

interface BarProps {
    Female: number;
    Male: number;
}

const Bar: React.FC<BarProps> = ({ Female, Male }) => (
    <div className="flex items-center gap-1 relative">
        <div className="h-1 bg-pink-500 absolute top-0 right-0 rounded-s-lg" style={{ width: `${Female}px` }}></div>
        <div></div>
        <div className="h-1 bg-blue-500 absolute top-0 left-1 rounded-e-lg" style={{ width: `${Male}px` }}></div>
    </div>
);

const Dashboard: React.FC = () => {
    const products: Product[] = [
        { name: "Emerald Velvet Chair", price: "$355.90", sold: "917", img: Emerald_Velvet_Chair },
        { name: "Velvet Coral Sofa", price: "$279.00", sold: "804", img: Velvet_Coral_Sofa },
        { name: "Rotterdam Table", price: "$329.95", sold: "738", img: Rotterdam_Table },
        { name: "Yellow Lamp", price: "$315.50", sold: "684", img: Yellow_Lamp },
    ];

    const trafficData: TrafficData[] = [
        { ageRange: "35+" }, { ageRange: "30+" }, { ageRange: "25+" }, { ageRange: "20+" }, { ageRange: "15+" }, { ageRange: "10+" }
    ];

    const generateBars = () => {
        const bars: BarProps[] = [
            { Female: 50, Male: 48 },
            { Female: 85, Male: 80 },
            { Female: 78, Male: 65 },
            { Female: 85, Male: 78 },
            { Female: 55, Male: 85 },
            { Female: 45, Male: 40 },
            { Female: 90, Male: 80 },
            { Female: 50, Male: 55 },
            { Female: 45, Male: 60 },
            { Female: 88, Male: 70 },
            { Female: 30, Male: 25 },
            { Female: 85, Male: 75 },
            { Female: 70, Male: 48 },
            { Female: 80, Male: 55 },
            { Female: 75, Male: 68 },
            { Female: 50, Male: 55 },
            { Female: 65, Male: 50 },
            { Female: 48, Male: 52 },
            { Female: 25, Male: 48 },
            { Female: 85, Male: 55 },
            { Female: 65, Male: 50 },
            { Female: 35, Male: 40 },
            { Female: 25, Male: 30 },
            { Female: 20, Male: 25 },
            { Female: 15, Male: 20 },
            { Female: 10, Male: 15 },
        ];

        return bars.map((bar, index) => <Bar key={index} Female={bar.Female} Male={bar.Male} />);
    };

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <div className="w-full py-4 px-5 bg-white rounded-[1rem]">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold text-gray-600">Top Products</p>
                </div>
                <ul>
                    {products.map((product, index) => (
                        <li key={index} className="flex items-center justify-between p-4 mb-2 bg-gray-100 rounded-lg border border-gray-300">
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

            <div className="w-full py-4 px-5 bg-white rounded-[1rem]">
                <div className="flex justify-between items-center mb-8">
                    <p className="text-lg font-semibold text-gray-600">Customer Traffic</p>
                    <button className="flex items-center py-2 px-5 text-sm text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-100 border border-gray-300">All Time</button>
                </div>
                <section className="flex w-full">
                    <div className="flex flex-col items-start w-1/3 gap-[1.6rem]">
                        <div className="text-pink-500 font-semibold text-sm">Female</div>
                        {trafficData.map((data, index) => (
                            <div key={index}>
                                <span className="text-xs text-gray-500">{data.ageRange}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                        <div className="flex flex-col items-center gap-3 mt-6">{generateBars()}</div>
                    </div>
                    <div className="flex flex-col items-end w-1/3 gap-6">
                        <div className="text-blue-500 font-semibold text-sm">Male</div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
