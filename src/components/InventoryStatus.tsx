import React, { ReactElement } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { SiAmazon, SiFlipkart, SiAlibabadotcom } from "react-icons/si";

// Define the type for each data item
interface DataItem {
    icon: ReactElement;
    name: string;
    value: number;
}

// Data with type annotations
const data: DataItem[] = [
    { icon: <SiAmazon />, name: "Amazon", value: 30 },
    { icon: <SiFlipkart />, name: "Flipkart", value: 35 },
    { icon: <SiAlibabadotcom />, name: "Alibaba", value: 55 },
];
const COLORS = ["#0D7C66", "#C5D3E8", "#FA812F"];
const RADIAN = Math.PI / 180;

// Define the type for the custom label entry
interface LabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    percent: number;
    name: string;
    icon: ReactElement; // Added icon here
}

const renderCustomLabel = (entry: LabelProps) => {
    const { cx, cy, midAngle, outerRadius, percent, name, icon } = entry;

    // Adjusted positions for the start, bend, and end of the label line
    const adjustedRadius = outerRadius - 10;
    const xStart = cx + adjustedRadius * Math.cos(-midAngle * RADIAN);
    const yStart = cy + adjustedRadius * Math.sin(-midAngle * RADIAN);

    const xBend = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
    const yBend = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);

    const xEnd = xBend + (xBend > cx ? 30 : -30);
    const yEnd = yBend;

    return (
        <g>
            <line x1={xStart} y1={yStart} x2={xBend} y2={yBend} stroke="#333" strokeWidth={1} />
            <line x1={xBend} y1={yBend} x2={xEnd} y2={yEnd} stroke="#333" strokeWidth={1} />
            <circle cx={xStart} cy={yStart} r={2} fill="#333" />
            <text x={xEnd + (xEnd > cx ? 10 : -10)} y={yEnd} textAnchor={xEnd > cx ? "start" : "end"} fill="#333">
                <tspan dy="-0.3em" x={xEnd + (xEnd > cx ? 10 : -10)}>
                    {icon}
                </tspan>
                <tspan dy="1.2em" x={xEnd + (xEnd > cx ? 10 : -10)}>
                    {name} {`${(percent * 100).toFixed(0)}%`}
                </tspan>
            </text>
        </g>
    );
};

// App component with type annotations
const App: React.FC = () => {
    return (
        <section className="bg-white rounded-[1rem] py-5 px-7 w-fit">
            <PieChart width={300} height={300}>
                <Pie
                    data={data.map(item => ({ ...item, icon: item.icon }))}
                    cx={140}
                    cy={150}
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={1}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </section>
    );
};

export default App;
