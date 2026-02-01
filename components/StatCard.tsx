
import React from 'react';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    colorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, colorClass }) => {
    return (
        <div className={`bg-slate-900/20 backdrop-blur-md border border-slate-100/20 rounded-2xl shadow-lg shadow-black/20 p-4 flex items-center space-x-4`}>
            <div className={`rounded-xl p-3 ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-slate-300 font-medium">{title}</p>
                <p className="text-xl font-bold text-white">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;