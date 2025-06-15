// export interface Curso {
//   id: number;
//   nombre: string;
// }

export interface StudentCourse {
  id: number;
  courses: {
    id: number;
    nombre: string;
  };
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
    id?: number;
    userName?: string;
    email?: string;
  };
  tutor_id?: number;
  tutor?: {
    id: number;
    nombre: string;
    apellido: string;
    telefono?: string;
  }; // Optional tutor field
  // cursos_ids: Curso[];
  studentCourses: StudentCourse[];
}

export interface StudentData {
  id?: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  genero_id: number;
  telefono: string;
  email: string;
  direccion: string;
  image?: string; // Optional image field

  user: {
    id?: number;
    userName?: string; // Input for fullname
    email?: string; // Input for email, also used in Docente
  };
  tutor_id?: number;
  tutor?: {
    id: number;
    nombre: string;
    apellido: string;
    telefono?: string;
  }; // Optional tutor field
  cursos_ids: number[];
  studentCourses: StudentCourse[];
}

export interface StudentResponse {
  data: Student[];
  total: number;
}
