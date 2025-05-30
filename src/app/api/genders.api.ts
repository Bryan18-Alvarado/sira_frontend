import {
  GendersData,
  GendersResponse,
} from "../../interface/genders.interface";

export async function getAllGenders(
  offset: number = 0,
  limit: number = 5
): Promise<GendersResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/genders?offset=${offset}&limit=${limit}`,
    { cache: "no-store" }
  );
  return await response.json();
}

export async function addGender(gendersData: GendersData) {
  const res = await fetch("http://localhost:4000/api/v1/genders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gendersData),
  });

  return await res.json();
}

export async function updateGender(id: number, gendersData: GendersData) {
  const res = await fetch(`http://localhost:4000/api/v1/genders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gendersData),
  });

  return await res.json();
}

export async function deleteGender(id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/genders/${id}`, {
    method: "DELETE",
  });

  return await res.json();
}
