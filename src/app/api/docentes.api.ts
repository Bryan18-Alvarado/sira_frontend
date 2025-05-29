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
  const res = await fetch("http://localhost:4000/api/v1/docentes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(docenteData),
  });

  return res.json();
}

export async function updateDocente(docenteData: DocenteData, id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/docentes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(docenteData),
  });

  return res.json();
}

export async function deleteDocente(id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/docentes/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
