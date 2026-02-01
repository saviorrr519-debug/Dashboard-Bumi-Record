
import React from 'react';
import Header from '../components/Header';
import { Report } from '../types';

const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-slate-800">Laporan {new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        report.weather === 'Cerah' ? 'bg-yellow-100 text-yellow-800' : 
                        report.weather === 'Berawan' ? 'bg-slate-200 text-slate-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                        {report.weather}
                    </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{report.activities}</p>
                <div className="flex items-center text-sm text-slate-500 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>{report.workers} Pekerja</span>
                    <span className="mx-2">|</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M4 7h16M4 17h16" /></svg>
                    <span>{report.materialsUsed.length} Material</span>
                </div>
            </div>
             {report.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-1">
                    {report.photos.map((photo, index) => (
                        <img key={index} src={photo} alt={`report-${report.id}-${index}`} className="h-24 w-full object-cover" />
                    ))}
                </div>
            )}
            <button className="w-full bg-slate-50 text-center py-2 text-primary font-semibold hover:bg-slate-100 transition-colors">
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
                        placeholder="Cari laporan..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary" 
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <div className="space-y-4">
                    {filteredReports.length > 0 ? (
                         filteredReports.map(report => (
                            <ReportCard key={report.id} report={report} />
                        ))
                    ) : (
                        <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                            <p className="text-slate-500">Tidak ada laporan yang ditemukan.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default History;
