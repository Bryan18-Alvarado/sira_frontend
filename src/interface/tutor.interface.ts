// Estructura para el listado paginado
export interface TutorResponse {
  data: Tutor[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

// Estructura base de un tutor
export interface Tutor {
  id: number;
  nombre: string;
  apellido: string;
  telefono?: string;
  estado_civil_id: number;
  genero: {
    id: number;
    name: string;
  };
  estado_civil: {
    id: number;
    marital_status: string;
  };
  correoElectronico?: string;
  direccion?: string;
  genero_id: number;
  isAvailable: boolean;
}

export interface TutorData {
  nombre: string;
  apellido: string;
  telefono?: string;
  estado_civil_id: number;
  correoElectronico?: string;
  direccion?: string;
  genero_id: number;
  isAvailable?: boolean;
}
