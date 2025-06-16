import {
  Docente,
  DocenteData,
  DocenteResponse,
} from "../../interface/docente.interface";

const API_URL = "http://localhost:4000/api/v1/docentes";

import { auth } from "@/auth";

export async function getAllDocentes(
  offset: number = 0,
  limit: number = 3
): Promise<DocenteResponse> {
  const response = await fetch(
    `${API_URL}?offset=${Number(offset)}&limit=${Number(limit)}`,
    { cache: "no-store" }
  );

  return response.json();
}
export async function getCoursesByDocenteId(docenteId: number) {
  const response = await fetch(
    `http://localhost:4000/api/v1/docentes/${docenteId}/cursos`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error al obtener los cursos del docente");
  }

  return response.json();
}

export async function getDocenteByUserId(userId: number) {
  const res = await fetch(
    `http://localhost:4000/api/v1/docentes/docente/usuario/${userId}`
  );

  if (!res.ok) {
    throw new Error(`Error al obtener docente: ${res.statusText}`);
  }

  const json = await res.json();
  // Si json.data es solo un número, retorna un objeto
  if (typeof json.data === "number") {
    return { id: json.data };
  }
  // Si ya es un objeto, retorna tal cual
  return json.data;
}
export async function addDocente(
  dataDocente: DocenteData,
  token: string | undefined
) {
  if (!token) throw new Error("Token no encontrado");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataDocente),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al crear el docente");
  }

  return res.json();
}

export async function getDocenteById(id: number): Promise<Docente> {
  const res = await fetch(`http://localhost:4000/api/v1/docentes/${id}`);
  const response = await res.json();
  return response.data;
}

export async function updateDocente(
  docenteData: DocenteData,
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
    body: JSON.stringify(docenteData),
  });

  return res.json();
}

export async function deleteDocente(id: number, token: string | undefined) {
  if (!token) throw new Error("Token no encontrado");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
