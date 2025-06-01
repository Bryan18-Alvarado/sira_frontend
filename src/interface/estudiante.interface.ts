export interface Student {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  generoId: number;
  genero: {
    id: number;
    nombre: string;
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
  generoId: number;
  telefono?: string;
  correoElectronico: string;
  direccion?: string;
}

export interface StudentResponse {
  data: Student[];
  total: number;
}
