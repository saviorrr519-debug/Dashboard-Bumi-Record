import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavIcon = ({ iconPath, label }: { iconPath: string; label: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
    </svg>
);

const NavItem = ({ to, iconPath, label }: { to: string; iconPath: string; label: string }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <NavLink
            to={to}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-slate-500 hover:text-primary-light'
            }`}
        >
            <NavIcon iconPath={iconPath} label={label}/>
            <span>{label}</span>
        </NavLink>
    );
};

const NewReportButton = () => (
     <NavLink
        to="/new-report"
        className="relative -top-6 flex items-center justify-center h-16 w-16 rounded-full bg-primary shadow-lg hover:bg-primary-dark transition-transform transform hover:scale-105"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
    </NavLink>
);


const BottomNav: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] pb-safe-bottom z-50">
            <div className="flex justify-around items-center h-full max-w-lg mx-auto">
                <NavItem to="/dashboard" iconPath="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-8-12V5a2 2 0 012-2h4a2 2 0 012 2v4m-6 8v-2h6v2" label="Dashboard" />
                <NavItem to="/materials" iconPath="M4 7v10m16-10v10M4 7h16M4 17h16" label="Material" />
                <NewReportButton />
                <NavItem to="/history" iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" label="Riwayat" />
                {/* FIX: Corrected typo `icon.Path` to `iconPath` to match component props. */}
                <NavItem to="/profile" iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" label="Profil" />
            </div>
        </nav>
    );
};

export default BottomNav;