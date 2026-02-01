
import React from 'react';
import Header from '../components/Header';
import { usePWAInstall } from '../hooks/usePWAInstall';

const ProfileMenuItem: React.FC<{ icon: React.ReactNode, text: string, onClick?: () => void }> = ({ icon, text, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full p-4 bg-white rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
        <div className="text-primary mr-4">{icon}</div>
        <span className="font-semibold text-slate-700">{text}</span>
        <div className="ml-auto text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </div>
    </button>
);

const DownloadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>);
const DocumentTextIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const LogoutIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>);

const Profile: React.FC = () => {
    const { isInstallable, handleInstallClick } = usePWAInstall();

    const handleExport = (format: 'PDF' | 'Excel') => {
        // Mock functionality
        alert(`Fungsi Ekspor ke ${format} akan diimplementasikan pada backend.`);
    }

    const handleLogout = () => {
        // Mock functionality
        alert('Anda telah logout.');
    }

    return (
        <div>
            <Header title="Profil & Pengaturan" />
            <div className="p-4 space-y-6">
                <div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4">
                    <img src="https://picsum.photos/seed/avatar/80/80" alt="Avatar" className="w-20 h-20 rounded-full" />
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Budi Santoso</h2>
                        <p className="text-slate-500">Mandor Lapangan</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {isInstallable && (
                         <ProfileMenuItem 
                            icon={<DownloadIcon />} 
                            text="Install Aplikasi di HP"
                            onClick={handleInstallClick}
                        />
                    )}
                    <ProfileMenuItem 
                        icon={<DocumentTextIcon />} 
                        text="Ekspor Laporan (PDF)"
                        onClick={() => handleExport('PDF')}
                    />
                     <ProfileMenuItem 
                        icon={<DocumentTextIcon />} 
                        text="Ekspor Material (Excel)"
                        onClick={() => handleExport('Excel')}
                    />
                </div>

                <div>
                    <ProfileMenuItem 
                        icon={<LogoutIcon />} 
                        text="Logout"
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
