export interface Course {
  id: number;
  categories_id: number;
  categories: {
    id: number;
    name: string;
  };
  level_id: number;
  level: {
    id: number;
    name: string;
  };
  docentes_id: number;
  docente: {
    id: number;
    name: string;
  };
  codigo: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  horario: string;
  fecha_inicio: string;
  fecha_fin: string;
  status: boolean;
  cupos_disponibles: number;
  requisitos: string;
  precio: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CoursesData {
  id: number;
  categories_id: number;
  level_id: number;
  docentes_id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  horario: string;
  status: boolean;
  fecha_inicio: Date;
  fecha_fin: Date;
  cupos_disponibles: number;
  requisitos: string;
  precio: number;
}

export interface CoursesResponse {
  data: Course[];
  total: number;
}
