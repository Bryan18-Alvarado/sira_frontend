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
  docente_id: number;
  docente: {
    id: number;
    name: string;
  };
  codigo: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  horario: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  status: Boolean;
  cupos_disponibles: number;
  requisitos: string;
  precio: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
