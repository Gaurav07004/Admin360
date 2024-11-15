import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";

const data = [
    { subject: "Americas", A: 2409, fullMark: 3500 },
    { subject: "Africa", A: 3028, fullMark: 3500 },
    { subject: "Middle East", A: 800, fullMark: 3500 },
    { subject: "Pacific", A: 1838, fullMark: 3500 },
    { subject: "Asia", A: 2843, fullMark: 3500 },
    { subject: "Europe", A: 2728, fullMark: 3500 },
];

// Custom tick component for PolarAngleAxis
const CustomPolarAngleAxisTick = ({ payload, x, y, textAnchor }) => (
    <g>
        <text
            x={x}
            y={y - 20}
            textAnchor={textAnchor}
            fontSize={12}
            fill="#4A5568"
        >
            {payload.value}
        </text>
        <text
            x={x}
            y={y}
            textAnchor={textAnchor}
            fontSize={14}
            fill="#4A5568"
            fontWeight="700"
        >
            {data.find(item => item.subject === payload.value)?.A}
        </text>
    </g>
);


function Page() {
    return (
        <section className="bg-white rounded-[1rem] py-5 px-7 w-fit">
            <RadarChart cx={200} cy={160} outerRadius={120} width={400} height={300} data={data}>
                <PolarGrid stroke="#E1E5EA" strokeWidth={1.5} />
                <PolarAngleAxis dataKey="subject" tick={<CustomPolarAngleAxisTick />} />
                <Radar name="Mike" dataKey="A" stroke="#FF6500" strokeWidth={0.8} fill="#FF6500" fillOpacity={0.1} dot={{ r: 1.5, fill: "#FF6500", stroke: "#FF6500", strokeWidth: 2 }} />
            </RadarChart>
        </section>
    );
}

export default Page;
