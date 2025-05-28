export interface Estudent {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  generoId: {
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

export interface EstudentData {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  generoId: number;
  telefono?: string;
  correoElectronico: string;
  direccion?: string;
}

export interface EstudentResponse {
  data: Estudent[];
  total: number;
}
