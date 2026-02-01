
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { Material } from '../types';

const MaterialListItem: React.FC<{ material: Material }> = ({ material }) => {
    const isLowStock = material.stock <= material.lowStockThreshold;
    // We define "safe stock" as 3x the low stock threshold for the progress bar calculation.
    const safeStockMax = material.lowStockThreshold * 3;
    const stockPercentage = (material.stock / safeStockMax) * 100;

    return (
        <div className={`bg-white rounded-xl shadow-md p-4 transition-all duration-300 ${isLowStock ? 'border-2 border-red-500 ring-4 ring-red-500/10' : 'border border-transparent'}`}>
            <div className="flex justify-between items-start">
                <div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        isLowStock ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                        {material.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 mt-2">{material.name}</h3>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                     <p className={`text-3xl font-bold ${isLowStock ? 'text-red-500' : 'text-slate-800'}`}>
                        {material.stock}
                     </p>
                    <p className="text-sm text-slate-500">{material.unit}</p>
                </div>
            </div>

            {isLowStock && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                         <p className="font-bold text-red-700">Peringatan Stok Rendah!</p>
                         <p className="text-sm text-red-600">Hanya tersisa {material.stock} {material.unit}. Segera pesan ulang.</p>
                    </div>
                </div>
            )}

            <div className="mt-4">
                 <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-slate-500">Tingkat Stok</span>
                    <span className={`text-xs font-bold ${isLowStock ? 'text-red-500' : 'text-slate-600'}`}>
                        {material.stock} / {safeStockMax} {material.unit}
                    </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5" role="presentation">
                    <div 
                        className={`h-2.5 rounded-full transition-all duration-500 ${isLowStock ? 'bg-red-500' : 'bg-primary'}`} 
                        style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        role="progressbar"
                        aria-valuenow={material.stock}
                        aria-valuemin={0}
                        aria-valuemax={safeStockMax}
                        aria-label={`Stok ${material.name}`}
                    ></div>
                </div>
            </div>
        </div>
    );
};


const Materials: React.FC<{ materials: Material[] }> = ({ materials }) => {
    const [categoryFilter, setCategoryFilter] = useState('Semua');
    const [stockStatusFilter, setStockStatusFilter] = useState<'Semua' | 'Aman' | 'Rendah'>('Semua');
    const [sortBy, setSortBy] = useState('stock-asc');

    const categories = ['Semua', ...Array.from(new Set(materials.map(m => m.category)))];
    const stockStatuses = ['Semua', 'Stok Aman', 'Stok Rendah'];

    const displayedMaterials = useMemo(() => {
        let processedMaterials = [...materials];

        // 1. Filter by category
        if (categoryFilter !== 'Semua') {
            processedMaterials = processedMaterials.filter(m => m.category === categoryFilter);
        }

        // 2. Filter by stock status
        if (stockStatusFilter === 'Stok Aman') {
            processedMaterials = processedMaterials.filter(m => m.stock > m.lowStockThreshold);
        } else if (stockStatusFilter === 'Stok Rendah') {
            processedMaterials = processedMaterials.filter(m => m.stock <= m.lowStockThreshold);
        }

        // 3. Sort
        switch (sortBy) {
            case 'name-asc':
                processedMaterials.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                processedMaterials.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'stock-desc':
                processedMaterials.sort((a, b) => b.stock - a.stock);
                break;
            case 'stock-asc':
            default:
                processedMaterials.sort((a, b) => a.stock - b.stock);
                break;
        }

        return processedMaterials;
    }, [materials, categoryFilter, stockStatusFilter, sortBy]);


    return (
        <div>
            <Header title="Manajemen Material" />
            <div className="p-4 space-y-4">
                {/* Category Filters */}
                <div>
                    <h3 className="text-sm font-semibold text-slate-500 mb-2">Kategori</h3>
                    <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
                        {categories.map(category => (
                            <button 
                                key={category}
                                onClick={() => setCategoryFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                                    categoryFilter === category 
                                    ? 'bg-primary text-white shadow' 
                                    : 'bg-white text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Stock Status and Sorting Filters */}
                <div className="bg-white p-3 rounded-xl shadow-sm space-y-3">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 mb-2">Status Stok</h3>
                        <div className="grid grid-cols-3 gap-2">
                             {stockStatuses.map(status => (
                                <button
                                    key={status}
                                    onClick={() => setStockStatusFilter(status as any)}
                                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                        stockStatusFilter === status
                                        ? 'bg-primary/20 text-primary-dark'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {status}
                                </button>
                             ))}
                        </div>
                    </div>
                     <div>
                        <label htmlFor="sort-by" className="text-sm font-semibold text-slate-500 mb-1 block">Urutkan Berdasarkan</label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full p-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="stock-asc">Stok Terendah</option>
                            <option value="stock-desc">Stok Tertinggi</option>
                            <option value="name-asc">Nama A-Z</option>
                            <option value="name-desc">Nama Z-A</option>
                        </select>
                     </div>
                </div>
                
                {/* Material List */}
                <div className="space-y-4">
                    {displayedMaterials.length > 0 ? (
                        displayedMaterials.map(material => (
                            <MaterialListItem key={material.id} material={material} />
                        ))
                    ) : (
                        <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                            <p className="text-slate-500">Tidak ada material yang cocok dengan filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Materials;
