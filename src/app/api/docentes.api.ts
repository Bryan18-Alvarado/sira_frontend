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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4NTgyMjI3LCJleHAiOjE3NDg1ODk0Mjd9.Oz9lTUd3OP-r0agzFu9LZcJAS5FP0TFTcjjLx2Aq8pE";
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
