
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import NewReport from './pages/NewReport';
import Materials from './pages/Materials';
import History from './pages/History';
import Profile from './pages/Profile';
import { mockMaterials, mockReports } from './data/mockData';
import { Material, Report } from './types';

const App: React.FC = () => {
    const [materials, setMaterials] = useState<Material[]>(mockMaterials);
    const [reports, setReports] = useState<Report[]>(mockReports);

    const handleNewReportSubmit = (newReportData: Omit<Report, 'id'>) => {
        // Create a full report object with a new ID
        const fullReport: Report = { ...newReportData, id: `rep-${Date.now()}` };

        // Add the new report to the beginning of the reports list
        setReports(prevReports => [fullReport, ...prevReports]);

        // Update material stocks
        const updatedMaterials = materials.map(material => {
            const usedMaterial = newReportData.materialsUsed.find(
                used => used.materialId === material.id
            );
            if (usedMaterial) {
                // Return a new object with the updated stock
                return {
                    ...material,
                    stock: material.stock - usedMaterial.quantity,
                };
            }
            // Return the original material if it wasn't used
            return material;
        });
        setMaterials(updatedMaterials);
    };


    return (
        <HashRouter>
            <div className="min-h-screen text-slate-100 font-sans">
                <main className="pb-24 pt-safe-top">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard materials={materials} reports={reports} />} />
                        <Route path="/materials" element={<Materials materials={materials} />} />
                        <Route path="/new-report" element={<NewReport materials={materials} onReportSubmit={handleNewReportSubmit} />} />
                        <Route path="/history" element={<History reports={reports} />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </main>
                <BottomNav />
            </div>
        </HashRouter>
    );
};

export default App;