
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Material, Report } from '../types';

interface NewReportProps {
    materials: Material[];
    onReportSubmit: (report: Omit<Report, 'id'>) => void;
}

const NewReport: React.FC<NewReportProps> = ({ materials, onReportSubmit }) => {
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [weather, setWeather] = useState<'Cerah' | 'Berawan' | 'Hujan'>('Cerah');
    const [workers, setWorkers] = useState('');
    const [activities, setActivities] = useState('');
    const [usedQuantities, setUsedQuantities] = useState<{ [key: string]: string }>({});
    const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);

    const handleQuantityChange = (materialId: string, value: string) => {
        const currentStock = materials.find(m => m.id === materialId)?.stock || 0;
        const requestedQuantity = Number(value);
        if (requestedQuantity > currentStock) {
            alert(`Jumlah penggunaan (${requestedQuantity}) melebihi stok yang tersedia (${currentStock}).`);
            setUsedQuantities(prev => ({ ...prev, [materialId]: String(currentStock) }));
        } else {
            setUsedQuantities(prev => ({ ...prev, [materialId]: value }));
        }
    };
    
    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedPhotos(Array.from(event.target.files));
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!activities.trim() || !workers.trim() || Number(workers) <= 0) {
            alert("Mohon isi jumlah pekerja (harus lebih dari 0) dan uraian kegiatan.");
            return;
        }

        const materialsUsed = Object.entries(usedQuantities)
            .map(([materialId, quantityStr]) => ({
                materialId,
                quantity: Number(quantityStr) || 0,
            }))
            .filter(item => item.quantity > 0);
        
        if (materialsUsed.length > 0) {
            if(!confirm("Anda akan mengurangi stok material sesuai input. Lanjutkan?")) {
                return;
            }
        }

        const newReport: Omit<Report, 'id'> = {
            date,
            weather,
            workers: Number(workers),
            activities,
            materialsUsed,
            photos: [],
        };

        onReportSubmit(newReport);
        alert('Laporan berhasil dikirim!');
        navigate('/history');
    };

    const inputClasses = "w-full p-3 bg-slate-900/30 border border-slate-100/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-slate-400";

    return (
        <div>
            <Header title="Buat Laporan Baru" />
            <form className="p-4 space-y-6" onSubmit={handleSubmit}>
                {/* Section: Info Umum */}
                <div className="bg-slate-900/20 backdrop-blur-md border border-slate-100/20 p-5 rounded-2xl shadow-lg shadow-black/20 space-y-4">
                    <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2">Informasi Umum</h3>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-1">Tanggal Laporan</label>
                        <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className={inputClasses} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="weather" className="block text-sm font-medium text-slate-300 mb-1">Cuaca</label>
                           <select id="weather" value={weather} onChange={e => setWeather(e.target.value as any)} className={inputClasses}>
                               <option className="bg-slate-800">Cerah</option>
                               <option className="bg-slate-800">Berawan</option>
                               <option className="bg-slate-800">Hujan</option>
                           </select>
                        </div>
                        <div>
                           <label htmlFor="workers" className="block text-sm font-medium text-slate-300 mb-1">Jumlah Pekerja</label>
                           <input type="number" id="workers" value={workers} onChange={e => setWorkers(e.target.value)} placeholder="cth: 10" required min="1" className={inputClasses} />
                        </div>
                    </div>
                </div>

                {/* Section: Detail Pekerjaan */}
                <div className="bg-slate-900/20 backdrop-blur-md border border-slate-100/20 p-5 rounded-2xl shadow-lg shadow-black/20 space-y-4">
                     <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2">Detail Pekerjaan</h3>
                    <div>
                        <label htmlFor="activities" className="block text-sm font-medium text-slate-300 mb-1">Uraian Kegiatan</label>
                        <textarea id="activities" value={activities} onChange={e => setActivities(e.target.value)} rows={4} required placeholder="Jelaskan pekerjaan yang dilakukan hari ini..." className={inputClasses}></textarea>
                    </div>
                </div>
                
                {/* Section: Material Digunakan */}
                 <div className="bg-slate-900/20 backdrop-blur-md border border-slate-100/20 p-5 rounded-2xl shadow-lg shadow-black/20 space-y-4">
                     <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2">Material Digunakan (Stok Saat Ini)</h3>
                     {materials.map(material => (
                         <div key={material.id} className="grid grid-cols-3 items-center gap-2">
                            <label htmlFor={`mat-${material.id}`} className="col-span-2 text-slate-200">{material.name} ({material.stock} {material.unit})</label>
                            <input 
                                type="number" 
                                id={`mat-${material.id}`} 
                                value={usedQuantities[material.id] || ''}
                                onChange={e => handleQuantityChange(material.id, e.target.value)}
                                placeholder="0" 
                                min="0"
                                max={material.stock}
                                className={`${inputClasses} text-center`}
                            />
                         </div>
                     ))}
                 </div>

                {/* Section: Upload Foto */}
                <div className="bg-slate-900/20 backdrop-blur-md border border-slate-100/20 p-5 rounded-2xl shadow-lg shadow-black/20 space-y-4">
                     <h3 className="text-lg font-bold text-white border-b border-white/20 pb-2">Dokumentasi Foto</h3>
                    <label htmlFor="photo-upload" className="w-full flex flex-col items-center px-4 py-6 bg-slate-900/30 text-primary rounded-lg shadow-inner tracking-wide uppercase border-2 border-dashed border-primary/50 cursor-pointer hover:bg-primary/20 hover:text-primary-light">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span className="mt-2 text-base leading-normal">Pilih Foto</span>
                        <input type="file" id="photo-upload" multiple accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    </label>
                    {selectedPhotos.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {selectedPhotos.map((file, index) => (
                                <img key={index} src={URL.createObjectURL(file)} alt={`preview ${index}`} className="w-full h-24 object-cover rounded-lg"/>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Submit Button */}
                <button type="submit" className="w-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold text-lg p-4 rounded-xl shadow-lg shadow-black/30 hover:from-amber-500 hover:to-orange-600 transition-all transform hover:scale-105">
                    Kirim Laporan
                </button>
            </form>
        </div>
    );
};

export default NewReport;