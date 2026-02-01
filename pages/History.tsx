
import React from 'react';
import Header from '../components/Header';
import { Report } from '../types';

const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
    return (
        <div className="bg-slate-900/20 backdrop-blur-md border border-slate-100/20 rounded-2xl shadow-lg shadow-black/20 overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-white">Laporan {new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        report.weather === 'Cerah' ? 'bg-yellow-500/30 text-yellow-100' : 
                        report.weather === 'Berawan' ? 'bg-slate-500/30 text-slate-200' : 'bg-blue-500/30 text-blue-100'
                    }`}>
                        {report.weather}
                    </span>
                </div>
                <p className="text-sm text-slate-300 line-clamp-2">{report.activities}</p>
                <div className="flex items-center text-sm text-slate-300 mt-3 border-t border-white/20 pt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                    <span>{report.workers} Pekerja</span>
                    <span className="mx-2 text-slate-500">·</span>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                    <span>{report.materialsUsed.length} Material</span>
                </div>
            </div>
             {report.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-1">
                    {report.photos.slice(0, 3).map((photo, index) => (
                        <div key={index} className="relative">
                            <img src={photo} alt={`report-${report.id}-${index}`} className="h-24 w-full object-cover" />
                            {report.photos.length > 3 && index === 2 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                                    +{report.photos.length - 3}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            <button className="w-full bg-slate-900/30 text-center py-2 text-primary-light font-semibold hover:bg-slate-900/50 transition-colors">
                Lihat Detail
            </button>
        </div>
    );
};


const History: React.FC<{ reports: Report[] }> = ({ reports }) => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredReports = reports.filter(report => 
        report.activities.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Header title="Riwayat Laporan" />
            <div className="p-4">
                <div className="relative mb-4">
                    <input 
                        type="text" 
                        placeholder="Cari berdasarkan kegiatan atau tanggal..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 bg-slate-900/30 border border-slate-100/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <div className="space-y-4">
                    {filteredReports.length > 0 ? (
                         filteredReports.map(report => (
                            <ReportCard key={report.id} report={report} />
                        ))
                    ) : (
                        <div className="text-center py-10 bg-slate-900/20 backdrop-blur-md border border-slate-100/20 rounded-2xl shadow-lg shadow-black/20">
                            <p className="text-slate-300">Tidak ada laporan yang ditemukan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;