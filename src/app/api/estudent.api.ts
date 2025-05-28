import {
  EstudentResponse,
  EstudentData,
} from "../../interface/estudiante.interface";

export async function getAllEstudents(
  offet: number = 0,
  limit: number = 3
): Promise<EstudentResponse> {
  const response = await fetch(
    `http://localhost:4000/api/vi/estudents?offset=${offet}&limit=${limit}`,
    { cache: "no-store" }
  );

  return response.json();
}

export async function addEstudent(EstudentData: EstudentData) {
  const res = await fetch("http://localhost:3000/api/vi/estudents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(EstudentData),
  });

  return res.json();
}

export async function deleteEstudent(id: number) {
  const res = await fetch(`http://localhost:3000/api/vi/estudents/${id}`, {
    method: "DELETE",
  });

  return res.json();
}
export async function updateEstudent(id: number, EstudentData: EstudentData) {
  const res = await fetch(`http://localhost:3000/api/vi/estudents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(EstudentData),
  });

  return res.json();
}
