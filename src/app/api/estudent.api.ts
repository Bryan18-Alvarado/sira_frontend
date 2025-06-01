import {
  StudentData,
  StudentResponse,
} from "../../interface/estudiante.interface";

export async function getEstudiantesAll(
  offet: number = 0,
  limit: number = 3
): Promise<StudentResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/estudiantes?offset=${offet}&limit=${limit}`,
    { cache: "no-store" }
  );

  return response.json();
}

export async function addStudent(StudentData: StudentData) {
  const res = await fetch("http://localhost:4000/api/v1/estudiantes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(StudentData),
  });

  return res.json();
}

export async function deleteStudent(id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/estudiantes/${id}`, {
    method: "DELETE",
  });

  return res.json();
}

export async function getStudentById(id: number): Promise<StudentData> {
  const res = await fetch(`http://localhost:4000/api/v1/estudiantes/${id}`);
  return res.json();
}

export async function updateEstudent(StudentData: StudentData, id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/estudiantes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(StudentData),
  });

  return res.json();
}

