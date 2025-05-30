import {
  MaritalStatusData,
  MaritalStatusResponse,
} from "../../interface/estado-civil.interface";

export async function getAllMaritalStatus(
  offset: number = 0,
  limit: number = 5
): Promise<MaritalStatusResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/marital-status?offset=${offset}&limit=${limit}`,
    { cache: "no-store" }
  );
  return await response.json();
}

export async function addMaritalStatus(maritalStatusData: MaritalStatusData) {
  const res = await fetch("http://localhost:4000/api/v1/marital-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(maritalStatusData),
  });

  return await res.json();
}

export async function updateMaritalStatus(
  id: number,
  maritalStatusData: MaritalStatusData
) {
  const res = await fetch(`http://localhost:4000/api/v1/marital-status/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(maritalStatusData),
  });

  return await res.json();
}

export async function deleteMaritalStatus(id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/marital-status/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}
