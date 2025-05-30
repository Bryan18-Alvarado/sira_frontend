import {
  DocenteData,
  DocenteResponse,
} from "../../interface/docente.interface";

export async function getAllDocentes(
  offset: number = 0,
  limit: number = 3
): Promise<DocenteResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/docentes?offset=${Number(
      offset
    )}&limit=${Number(limit)}`,
    { cache: "no-store" }
  );

  return response.json();
}

export async function addDocente(docenteData: DocenteData) {
  const token = "Agregar tu token de autenticación aquí";
  const res = await fetch("http://localhost:4000/api/v1/docentes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(docenteData),
  });

  return res.json();
}

export async function updateDocente(docenteData: DocenteData, id: number) {
  const token = "Agregar tu token de autenticación aquí";
  const res = await fetch(`http://localhost:4000/api/v1/docentes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(docenteData),
  });

  return res.json();
}

export async function deleteDocente(id: number) {
  const token = "Agregar tu token de autenticación aquí";
  const res = await fetch(`http://localhost:4000/api/v1/docentes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
