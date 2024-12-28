"use client";
import OrderStat from "@/components/OrderStatistics";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface TrafficData {
    ageRange: string;
}

interface BarProps {
    Female: number;
    Male: number;
}

const Dashboard: React.FC = () => {
    const { CustomerTrafficData } = useSelector((state: RootState) => state.menu);

    const Bar: React.FC<BarProps> = ({ Female, Male }) => (
        <div className="flex items-center gap-1 relative">
            <div className="h-1 bg-pink-500 absolute top-0 right-0 rounded-s-lg" style={{ width: `${Female}px` }}></div>
            <div></div>
            <div className="h-1 bg-blue-500 absolute top-0 left-1 rounded-e-lg" style={{ width: `${Male}px` }}></div>
        </div>
    );

    const generateBars = () => {
        return CustomerTrafficData.map((bar, index) => <Bar key={index} Female={bar.Female} Male={bar.Male} />);
    };

    const trafficData: TrafficData[] = [
        { ageRange: "35+" }, { ageRange: "30+" }, { ageRange: "25+" }, { ageRange: "20+" }, { ageRange: "15+" }, { ageRange: "10+" }
    ];

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <OrderStat />
            <div className="w-full py-4 px-5 bg-white rounded-[1rem] dark:bg-[#263445]">
                <div className="flex justify-between items-center mb-6">
                    <p className="font-semibold text-gray-600 text-[1.1rem] dark:text-gray-300">Customer Traffic</p>
                    <button className="flex items-center py-2 px-5 text-sm text-gray-500 dark:text-gray-300 bg-gray-100 rounded-lg hover:bg-gray-100 border border-gray-300 dark:border-gray-500 dark:bg-[#263445] hover:dark:bg-[#263445]">All Time</button>
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
