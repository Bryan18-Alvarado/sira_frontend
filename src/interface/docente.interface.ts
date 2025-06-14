export interface Curso {
  id: number;
  nombre: string;
}

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
  codigo_laboral: string;
  direccion?: string;
  fecha_ingreso: string;
  fecha_nacimiento: string;
  image?: string;
  telefono?: string;
  email: string;
  isAvailable?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  courses: Curso[];

  user: {
    id?: number;
    userName?: string;
    email?: string;
  };
}

export interface DocenteData {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  genero_id: number;
  estado_civil_id: number;
  codigo_laboral: number;
  cursos_ids: number[];
  direccion?: string;
  fecha_ingreso: string;
  fecha_nacimiento: string;
  telefono?: string;
  email: string;
  image?: string;
  user: {
    userName?: string; // Input for fullname
    email?: string; // Input for email, also used in Docente
  };
  isAvailable?: boolean;
}

export interface DocenteResponse {
  data: Docente[];
  total: number;
}
