import { LevelsData, LevelsResponse } from "../../interface/levels.interface";

export async function getAllLevels(
  offset: number = 0,
  limit: number = 5
): Promise<LevelsResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/levels?offset=${Number(
      offset
    )}&limit=${Number(limit)}`,
    { cache: "no-store" }
  );

  return await response.json();
}

export async function addLevel(levelsData: LevelsData) {
  const res = await fetch("http://localhost:4000/api/v1/levels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(levelsData),
  });
  return res.json();
}

export async function getLevelById(id: number): Promise<LevelsData> {
  const res = await fetch(`http://localhost:4000/api/v1/levels/${id}`);
  const response = await res.json();
  return response;
}

export async function updateLevel(levelsData: LevelsData, id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/levels/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(levelsData),
  });
  return res.json();
}

export async function deleteCourse(id: number) {
  const token = "";
  const res = await fetch(`http://localhost:4000/api/v1/levels/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
