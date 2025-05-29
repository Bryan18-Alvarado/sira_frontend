export interface Docente {
  id: number;
  nombre: string;
  apellido: string;
  edad: string;
  genero_id: number;
  genero?: {
    id: number;
    nombre: string;
  };
  estado_civil_id: number;
  estado_civil?: {
    id: number;
    nombre: string;
  };
  codigo_laboral: string;
  cursos_asignados: string;
  direccion?: string;
  fecha_ingreso: string;
  fecha_nacimiento: string;
  telefono: string;
  email?: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface DocenteData {
  id: number;
  nombre: string;
  apellido: string;
  edad: string;
  genero_id: number;
  estado_civil_id: number;
  codigo_laboral: string;
  cursos_asignados: string;
  direccion?: string;
  fecha_ingreso: string;
  fecha_nacimiento: string;
  telefono: string;
  email?: string;
}

export interface DocentesResponse {
  data: Docente[];
  total: number;
}
