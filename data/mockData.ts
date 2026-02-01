
import { Material, Report } from '../types';

export const mockMaterials: Material[] = [
  { id: 'mat-001', name: 'Semen Portland 50kg', stock: 85, unit: 'zak', category: 'Semen & Pasir', lowStockThreshold: 20 },
  { id: 'mat-002', name: 'Pasir Urug', stock: 15, unit: 'm³', category: 'Semen & Pasir', lowStockThreshold: 5 },
  { id: 'mat-003', name: 'Besi Beton Ø10', stock: 250, unit: 'batang', category: 'Besi & Baja', lowStockThreshold: 50 },
  { id: 'mat-004', name: 'Kayu Papan 2x20', stock: 18, unit: 'lembar', category: 'Kayu', lowStockThreshold: 10 },
  { id: 'mat-005', name: 'Cat Tembok Putih 5L', stock: 5, unit: 'kaleng', category: 'Cat', lowStockThreshold: 5 },
  { id: 'mat-006', name: 'Batu Bata Merah', stock: 2500, unit: 'buah', category: 'Lainnya', lowStockThreshold: 1000 },
];

export const mockReports: Report[] = [
  { 
    id: 'rep-001', 
    date: '2024-07-20', 
    weather: 'Cerah', 
    workers: 12, 
    activities: 'Pemasangan pondasi cakar ayam di area timur. Pengecoran kolom utama.', 
    materialsUsed: [{ materialId: 'mat-001', quantity: 20 }, { materialId: 'mat-002', quantity: 3 }],
    photos: ['https://picsum.photos/seed/project1/400/300']
  },
  { 
    id: 'rep-002', 
    date: '2024-07-19', 
    weather: 'Berawan', 
    workers: 10, 
    activities: 'Penggalian tanah untuk jalur pipa air bersih.', 
    materialsUsed: [],
    photos: []
  },
  { 
    id: 'rep-003', 
    date: '2024-07-18', 
    weather: 'Hujan', 
    workers: 5, 
    activities: 'Pekerjaan dihentikan karena hujan deras. Melakukan pembersihan area kerja internal.', 
    materialsUsed: [],
    photos: ['https://picsum.photos/seed/project2/400/300', 'https://picsum.photos/seed/project3/400/300']
  },
];
