
import React from 'react';

interface HeaderProps {
    title: string;
    action?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, action }) => {
    return (
        <header className="sticky top-0 bg-slate-50/80 backdrop-blur-sm z-40 pt-safe-top">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
                    {action && <div>{action}</div>}
                </div>
            </div>
        </header>
    );
};

export default Header;
