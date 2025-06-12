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

  user: {
    id: number;
    fullName: string;
    email: string;
  };
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

  user: {
    fullName: string; // Input for fullname
    email: string; // Input for email, also used in Docente
  };
}

export interface StudentResponse {
  data: Student[];
  total: number;
}
