export interface Categories {
  id: number;
  nombre: string;
  descripcion: string;
  status: boolean;
  createdAt: Date;
  updateAt: Date;
  deleteAt: Date | null;
}

export interface CategoriesData {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface CategoriesResponse {
  data: Categories[];
  total: number;
}
