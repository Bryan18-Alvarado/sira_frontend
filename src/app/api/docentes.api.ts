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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4NjUwMjE3LCJleHAiOjE3NDg2NTc0MTd9.0-E61aS4g6d3uE_oGYmmsyCO8xao6hl-FAv1tesGvMs";
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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4NjUwMjE3LCJleHAiOjE3NDg2NTc0MTd9.0-E61aS4g6d3uE_oGYmmsyCO8xao6hl-FAv1tesGvMs";
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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4NjUwMjE3LCJleHAiOjE3NDg2NTc0MTd9.0-E61aS4g6d3uE_oGYmmsyCO8xao6hl-FAv1tesGvMs";
  const res = await fetch(`http://localhost:4000/api/v1/docentes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
