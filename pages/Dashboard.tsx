
import React from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import { ChartData, Material, Report } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
);
const CubeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7l8 4" /></svg>
);


const ProjectProgressChart: React.FC = () => {
    const data: ChartData[] = [
        { name: 'Jan', value: 30 }, { name: 'Feb', value: 45 }, { name: 'Mar', value: 55 },
        { name: 'Apr', value: 60 }, { name: 'Mei', value: 75 }, { name: 'Jun', value: 80 }, { name: 'Jul', value: 85 }
    ];
    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-4 text-slate-700">Progress Proyek (%)</h3>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tick={{ fill: '#64748b' }} />
                    <YAxis tick={{ fill: '#64748b' }} />
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                    <Area type="monotone" dataKey="value" stroke="#d97706" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

const MaterialStockChart: React.FC<{materials: Material[]}> = ({ materials }) => {
    const topStockMaterials = [...materials].sort((a,b) => b.stock - a.stock).slice(0, 5);
    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-4 text-slate-700">Stok Material Teratas</h3>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topStockMaterials} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" tick={{ fill: '#64748b' }} />
                    <YAxis type="category" dataKey="name" width={50} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }} />
                    <Legend />
                    <Bar dataKey="stock" name="Stok" fill="#d97706" />
                </BarChart>
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
            <Header title="Dashboard" />
            <div className="p-4 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard title="Total Pekerja Hari Ini" value={`${latestReport?.workers || 0} Orang`} icon={<UsersIcon/>} colorClass="bg-blue-500" />
                    <StatCard title="Cuaca" value={latestReport?.weather || 'N/A'} icon={<SunIcon />} colorClass="bg-yellow-500" />
                    <StatCard title="Material Hampir Habis" value={`${lowStockCount} Jenis`} icon={<CubeIcon />} colorClass="bg-red-500" />
                </div>
                
                <ProjectProgressChart />
                <MaterialStockChart materials={materials}/>

                {latestReport && (
                    <div className="bg-white p-4 rounded-xl shadow-md">
                        <h3 className="font-bold text-lg mb-2 text-slate-700">Laporan Cepat</h3>
                        <p className="text-slate-600 mb-4">Akses cepat ke laporan terbaru dan aksi penting.</p>
                        <div className="flex justify-between items-center bg-amber-50 p-3 rounded-lg">
                            <div>
                                <p className="font-semibold text-amber-800">Laporan {new Date(latestReport.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</p>
                                <p className="text-sm text-amber-700 truncate">{latestReport.activities}</p>
                            </div>
                            <a href="#/history" className="text-primary font-bold flex-shrink-0 ml-2">Lihat</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
