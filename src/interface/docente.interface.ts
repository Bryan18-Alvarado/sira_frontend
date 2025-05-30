export interface Docente {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  genero_id: number;
  genero: {
    id: number;
    name: string;
  };
  estado_civil_id: number;
  estado_civil: {
    id: number;
    marital_status: string;
  };
  codigo_laboral: number;
  cursos_asignados: string;
  direccion?: string;
  fecha_ingreso: string;
  fecha_nacimiento: string;
  telefono?: string;
  email: string;
  isAvailable?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface DocenteData {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  genero_id: number;
  estado_civil_id: number;
  codigo_laboral: number;
  cursos_asignados: string;
  direccion?: string;
  fecha_ingreso: string;
  fecha_nacimiento: string;
  telefono?: string;
  email: string;
}

export interface DocenteResponse {
  data: Docente[];
  total: number;
}
