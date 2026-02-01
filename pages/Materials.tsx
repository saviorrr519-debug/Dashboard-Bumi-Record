
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { Material } from '../types';

const MaterialListItem: React.FC<{ material: Material }> = ({ material }) => {
    const isLowStock = material.stock <= material.lowStockThreshold;
    const safeStockMax = Math.max(material.lowStockThreshold * 3, material.stock, 1);
    const stockPercentage = (material.stock / safeStockMax) * 100;

    return (
        <div className={`bg-slate-900/20 backdrop-blur-md border border-slate-100/20 rounded-2xl shadow-lg shadow-black/20 p-4 transition-all duration-300`}>
            <div className="flex justify-between items-start">
                <div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        isLowStock ? 'bg-red-500/30 text-red-100' : 'bg-slate-500/30 text-slate-200'
                    }`}>
                        {material.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{material.name}</h3>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                     <p className={`text-3xl font-bold ${isLowStock ? 'text-red-400' : 'text-white'}`}>
                        {material.stock}
                     </p>
                    <p className="text-sm text-slate-300">{material.unit}</p>
                </div>
            </div>

            {isLowStock && (
                <div className="mt-4 p-3 bg-red-900/30 rounded-lg flex items-center border border-red-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                         <p className="font-bold text-red-200">Peringatan Stok Rendah!</p>
                         <p className="text-sm text-red-300">Stok di bawah ambang batas ({material.lowStockThreshold} {material.unit}).</p>
                    </div>
                </div>
            )}

            <div className="mt-4">
                <div className="w-full bg-slate-900/50 rounded-full h-3" role="presentation">
                    <div 
                        className={`h-3 rounded-full transition-all duration-500 ${isLowStock ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-amber-400 to-orange-400'}`} 
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        role="progressbar"
                    ></div>
                </div>
            </div>
        </div>
    );
};


const Materials: React.FC<{ materials: Material[] }> = ({ materials }) => {
    const [categoryFilter, setCategoryFilter] = useState('Semua');
    const [stockStatusFilter, setStockStatusFilter] = useState<'Semua' | 'Stok Aman' | 'Stok Rendah'>('Semua');
    const [sortBy, setSortBy] = useState('stock-asc');

    const categories = ['Semua', ...Array.from(new Set(materials.map(m => m.category)))];

    const displayedMaterials = useMemo(() => {
        let processedMaterials = [...materials];

        if (categoryFilter !== 'Semua') {
            processedMaterials = processedMaterials.filter(m => m.category === categoryFilter);
        }

        if (stockStatusFilter === 'Stok Aman') {
            processedMaterials = processedMaterials.filter(m => m.stock > m.lowStockThreshold);
        } else if (stockStatusFilter === 'Stok Rendah') {
            processedMaterials = processedMaterials.filter(m => m.stock <= m.lowStockThreshold);
        }

        switch (sortBy) {
            case 'name-asc':
                processedMaterials.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'name-desc':
                processedMaterials.sort((a, b) => b.name.localeCompare(a.name)); break;
            case 'stock-desc':
                processedMaterials.sort((a, b) => b.stock - a.stock); break;
            case 'stock-asc':
            default:
                processedMaterials.sort((a, b) => a.stock - b.stock); break;
        }

        return processedMaterials;
    }, [materials, categoryFilter, stockStatusFilter, sortBy]);

    const handleExportCSV = (materialsToExport: Material[]) => {
        if (materialsToExport.length === 0) {
            alert("Tidak ada material untuk diekspor.");
            return;
        }

        const headers = ['ID', 'Nama', 'Kategori', 'Stok', 'Unit', 'Ambang Batas Rendah'];
        const csvRows = [headers.join(',')];

        for (const material of materialsToExport) {
            const values = [
                material.id,
                `"${material.name.replace(/"/g, '""')}"`,
                material.category,
                material.stock,
                material.unit,
                material.lowStockThreshold
            ];
            csvRows.push(values.join(','));
        }

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'daftar_material.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const ExportButton = () => (
        <button
            onClick={() => handleExportCSV(displayedMaterials)}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-900/30 text-slate-200 rounded-lg hover:bg-slate-900/50 transition-colors"
            aria-label="Ekspor daftar material ke CSV"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold hidden sm:inline">Ekspor CSV</span>
        </button>
    );

    return (
        <div>
            <Header title="Manajemen Material" action={<ExportButton />} />
            <div className="p-4 space-y-4">
                <div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-2 px-1">Kategori</h3>
                    <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
                        {categories.map(category => (
                            <button 
                                key={category}
                                onClick={() => setCategoryFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                                    categoryFilter === category 
                                    ? 'bg-primary text-white shadow-md' 
                                    : 'bg-slate-900/30 text-slate-200 hover:bg-slate-900/50'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="bg-slate-900/20 backdrop-blur-md border border-slate-100/20 p-3 rounded-2xl shadow-lg shadow-black/20 space-y-3">
                     <div>
                        <label htmlFor="sort-by" className="text-sm font-semibold text-slate-300 mb-1 block">Urutkan Berdasarkan</label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full p-2 bg-slate-900/30 border border-slate-100/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option className="bg-slate-800" value="stock-asc">Stok Terendah</option>
                            <option className="bg-slate-800" value="stock-desc">Stok Tertinggi</option>
                            <option className="bg-slate-800" value="name-asc">Nama A-Z</option>
                            <option className="bg-slate-800" value="name-desc">Nama Z-A</option>
                        </select>
                     </div>
                </div>
                
                <div className="space-y-4">
                    {displayedMaterials.length > 0 ? (
                        displayedMaterials.map(material => (
                            <MaterialListItem key={material.id} material={material} />
                        ))
                    ) : (
                        <div className="text-center py-10 bg-slate-900/20 backdrop-blur-md border border-slate-100/20 rounded-2xl shadow-lg shadow-black/20">
                            <p className="text-slate-300">Tidak ada material yang cocok dengan filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Materials;