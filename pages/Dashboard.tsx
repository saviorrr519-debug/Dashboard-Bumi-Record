
import React from 'react';
import StatCard from '../components/StatCard';
import { ChartData, Material, Report } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm-.707 7.072l.707-.707a1 1 0 10-1.414-1.414l-.707.707a1 1 0 101.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
    </svg>
);
const CubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
    </svg>
);


const ProjectProgressChart: React.FC = () => {
    const data: ChartData[] = [
        { name: 'Jan', value: 30 }, { name: 'Feb', value: 45 }, { name: 'Mar', value: 55 },
        { name: 'Apr', value: 60 }, { name: 'Mei', value: 75 }, { name: 'Jun', value: 80 }, { name: 'Jul', value: 85 }
    ];
    return (
        <div className="bg-slate-900/20 backdrop-blur-md border border-slate-100/20 p-4 rounded-2xl shadow-lg shadow-black/20">
            <h3 className="font-bold text-lg mb-4 text-white">Progress Proyek (%)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.7}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fill: '#d1d5db' }} stroke="#9ca3af" />
                    <YAxis tick={{ fill: '#d1d5db' }} stroke="#9ca3af" />
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" strokeOpacity={0.2} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                            border: '1px solid rgba(255, 255, 255, 0.2)', 
                            borderRadius: '0.75rem',
                            color: '#ffffff'
                        }} 
                        cursor={{fill: 'rgba(245, 158, 11, 0.1)'}}
                    />
                    <Area type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

interface DashboardProps {
    materials: Material[];
    reports: Report[];
}

const Dashboard: React.FC<DashboardProps> = ({ materials, reports }) => {
    const lowStockCount = materials.filter(m => m.stock <= m.lowStockThreshold).length;
    const latestReport = reports.length > 0 ? reports[0] : null;

    return (
        <div>
            <header className="pt-safe-top">
                <div className="container mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-white">Selamat Datang, Budi</h1>
                    <p className="text-slate-300">
                        {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </header>
            <div className="p-4 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard title="Total Pekerja Hari Ini" value={`${latestReport?.workers || 0} Orang`} icon={<UsersIcon/>} colorClass="bg-blue-500/80" />
                    <StatCard title="Cuaca" value={latestReport?.weather || 'N/A'} icon={<SunIcon />} colorClass="bg-yellow-500/80" />
                    <StatCard title="Material Hampir Habis" value={`${lowStockCount} Jenis`} icon={<CubeIcon />} colorClass="bg-red-500/80" />
                </div>
                
                <ProjectProgressChart />

            </div>
        </div>
    );
};

export default Dashboard;