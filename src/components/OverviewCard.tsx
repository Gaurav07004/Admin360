import React from 'react';

interface OverviewCardProps {
    title: string;
    value: string;
    change: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, change }) => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between">
            <h3 className="text-gray-600 font-semibold">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className={`text-sm ${change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                {change}
            </p>
        </div>
    );
};

export default OverviewCard;
