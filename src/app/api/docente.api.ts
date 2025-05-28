import { DocentesResponse } from "@/interfaces/docente.interface";
import { DocenteData } from "../../interfaces/docente.interface";

export async function getAllDocentes(
  offset: number = 0,
  limit: number = 10
): Promise<DocentesResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/cars?offset=${Number(offset)}&limit=${Number(
      limit
    )}`,
    { cache: "no-store" }
  );
  return await response.json();
}

export async function addCar(docenteData: DocenteData) {
  const res = await fetch("http://localhost:4000/api/v1/docentes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(docenteData),
  });
  return await res.json();
}

export async function updateDocente(id: number, docenteData: DocenteData) {
  const res = await fetch(`http://localhost:4000/api/v1/docentes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(docenteData),
  });
  return await res.json();
}

export async function deleteDocente(id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/docentes/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}
