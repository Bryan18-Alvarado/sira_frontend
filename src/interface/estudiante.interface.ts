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
  correoElectronico: string;

  direccion?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isAvailable?: boolean;
}

export interface StudentData {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  genero_id: number;
  telefono: string;
  correoElectronico: string;
  direccion: string;
}

export interface StudentResponse {
  data: Student[];
  total: number;
}
