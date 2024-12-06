"use client";
import OrderStat from "@/components/OrderStatistics";

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
    ];

    return bars.map((bar, index) => <Bar key={index} Female={bar.Female} Male={bar.Male} />);
};

const trafficData: TrafficData[] = [
    { ageRange: "35+" }, { ageRange: "30+" }, { ageRange: "25+" }, { ageRange: "20+" }, { ageRange: "15+" }, { ageRange: "10+" }
];


const Dashboard: React.FC = () => {

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <OrderStat />

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
