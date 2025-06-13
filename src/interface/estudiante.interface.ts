export interface Tutor {
  id?: number;
  nombre: string;
  apellido: string;
  telefono?: string;
  estado_civil_id: number;
  correoElectronico?: string;
  direccion?: string;
  genero_id: number;
  isAvailable?: boolean;
}
export interface Student {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  genero_id: number;
  genero: {
    id: number;
    name: string;
  };
  telefono?: string;
  email: string;

  direccion?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isAvailable?: boolean;
  image?: string; // Optional image field

  user: {
    id: number;
    fullName: string;
    email: string;
  };
  tutor_id?: number;
  tutor?: Tutor; // Optional tutor field
  cursos_ids: number[];
}

export interface StudentData {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  genero_id: number;
  telefono: string;
  email: string;
  direccion: string;
  image?: string; // Optional image field

  user: {
    fullName: string; // Input for fullname
    email: string; // Input for email, also used in Docente
  };
  tutor_id?: number;
  tutor?: Tutor; // Optional tutor field
  cursos_ids: number[];
}

export interface StudentResponse {
  data: Student[];
  total: number;
}
