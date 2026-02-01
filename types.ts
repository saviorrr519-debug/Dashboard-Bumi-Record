
export interface Material {
  id: string;
  name: string;
  stock: number;
  unit: string;
  category: 'Semen & Pasir' | 'Besi & Baja' | 'Kayu' | 'Cat' | 'Lainnya';
  lowStockThreshold: number;
}

export interface Report {
  id: string;
  date: string;
  weather: 'Cerah' | 'Berawan' | 'Hujan';
  workers: number;
  activities: string;
  materialsUsed: { materialId: string; quantity: number }[];
  photos: string[]; // URLs or base64 strings
}

export interface ChartData {
  name: string;
  value: number;
}
