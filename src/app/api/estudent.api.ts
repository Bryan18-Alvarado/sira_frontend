import {
  StudentData,
  StudentResponse,
} from "../../interface/estudiante.interface";

const API_URL = "http://localhost:4000/api/v1/estudiantes";

export async function getEstudiantesAll(
  offet: number = 0,
  limit: number = 3
): Promise<StudentResponse> {
  const response = await fetch(`${API_URL}?offset=${offet}&limit=${limit}`, {
    cache: "no-store",
  });

  return response.json();
}

export async function addStudent(
  StudentData: StudentData,
  token: string | undefined
) {
  if (!token) throw new Error("Token no encontrado");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(StudentData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al crear el estudiante");
  }

  return res.json();
}

export async function deleteStudent(id: number, token: string | undefined) {
  if (!token) throw new Error("Token no encontrado");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
export async function getStudentById(id: number): Promise<StudentData> {
  if (isNaN(id)) {
    throw new Error("ID de estudiante inválido");
  }
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    throw new Error(`Error al obtener estudiante: ${res.statusText}`);
  }
  const json = await res.json();
  return json.data;
}

export async function updateEstudent(
  StudentData: StudentData,
  id: number,
  token: string | undefined
) {
  if (!token) throw new Error("Token no encontrado");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(StudentData),
  });

  return res.json();
}

// URL de los Estudiantes

export async function getCoursesByStudentId(studentId: number) {
  const response = await fetch(
    `http://localhost:4000/api/v1/studentcourses/student/${studentId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los cursos del estudiante");
  }

  return response.json();
}

export async function getStudentsByCourseId(courseId: number) {
  const response = await fetch(
    `http://localhost:4000/api/v1/studentcourses/course/${courseId}`,
    { cache: "no-store" }
  );
  if (!response.ok) throw new Error("Error al obtener estudiantes");
  const data = await response.json();
  return data.data || [];
}
export async function getStudentByUserId(userId: number) {
  const res = await fetch(
    `http://localhost:4000/api/v1/estudiantes/usuario/${userId}`
  );

  if (!res.ok) {
    throw new Error(`Error al obtener estudiante: ${res.statusText}`);
  }

  const json = await res.json();
  return json.data;
}
