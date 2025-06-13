import { Tutor } from "../../interface/estudiante.interface";

const API_URL = "http://localhost:4000/api/v1/tutores";

export async function getAllTutores(offset: number = 0, limit: number = 5) {
  const res = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getTutorById(id: number): Promise<Tutor | null> {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    console.error(`Error en la petición: ${res.status} ${res.statusText}`);
    return null;
  }

  const response = await res.json();
  console.log("Respuesta getTutorById:", response);

  if (!response) {
    return null;
  }

  return response;
}

export async function addTutor(dataTutor: any, token: string | undefined) {
  if (!token) throw new Error("Token no encontrado");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataTutor),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al crear el tutor");
  }

  return res.json();
}

export async function updateTutor(
  dataTutor: any,
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
    body: JSON.stringify(dataTutor),
  });

  return res.json();
}

export async function deleteTutor(id: number, token: string | undefined) {
  if (!token) throw new Error("Token no encontrado");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (
    res.status === 204 ||
    (res.status === 200 && res.headers.get("content-length") === "0")
  ) {
    return { message: "Tutor eliminado exitosamente" };
  }

  const text = await res.text();

  if (!text) {
    return { message: "Tutor eliminado exitosamente" };
  }

  const data = JSON.parse(text);

  if (!res.ok) {
    throw new Error(data.message || "Error al eliminar el tutor");
  }

  return data;
}
