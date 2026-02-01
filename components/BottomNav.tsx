
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavIcon = ({ iconPath, label, isActive }: { iconPath: string; label: string, isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" viewBox="0 0 20 20" fill="currentColor">
        <path d={iconPath} />
    </svg>
);

const NavItem = ({ to, iconPath, label }: { to: string; iconPath: string; label: string }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink
            to={to}
            className={`relative flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-slate-400 hover:text-primary-light'
            }`}
        >
            <div className={`absolute -top-1 h-8 w-16 rounded-full transition-all duration-300 ${isActive ? 'bg-primary/20 scale-100' : 'scale-0'}`}></div>
            <NavIcon iconPath={iconPath} label={label} isActive={isActive}/>
            <span className="font-medium">{label}</span>
        </NavLink>
    );
};

const NewReportButton = () => (
     <NavLink
        to="/new-report"
        className="relative -top-6 flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-black/30 hover:from-amber-500 hover:to-orange-600 transition-all transform hover:scale-105"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    </NavLink>
);


const BottomNav: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-slate-900/40 backdrop-blur-lg border-t border-white/20 pb-safe-bottom z-50">
            <div className="flex justify-around items-center h-full max-w-lg mx-auto">
                <NavItem to="/dashboard" iconPath="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM13 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM13 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" label="Dashboard" />
                <NavItem to="/materials" iconPath="M5 8h10a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1zM3 8a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8zM12 1h.01M15 1h.01M9 1h.01M12 4h.01M15 4h.01M9 4h.01" label="Material" />
                <NewReportButton />
                <NavItem to="/history" iconPath="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" label="Riwayat" />
                <NavItem to="/profile" iconPath="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" label="Profil" />
            </div>
        </nav>
    );
};

export default BottomNav;