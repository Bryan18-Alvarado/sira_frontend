import {
  CoursesData,
  CoursesResponse,
} from "../../interface/courses.interface";
const API_URL = "http://localhost:4000/api/v1/courses";
export async function getAllCourses(
  offset: number = 0,
  limit: number = 5
): Promise<CoursesResponse> {
  const response = await fetch(
    `${API_URL}?offset=${Number(offset)}&limit=${Number(limit)}`,
    { cache: "no-store" }
  );

  return await response.json();
}

export async function addCourse(formData: FormData, token: string | undefined) {
  if (!token) throw new Error("Token no encontrado");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
}

export async function updateCourse(
  formData: FormData,
  id: number,
  token: string | undefined
) {
  if (!token) throw new Error("Token no encontrado");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return res.json();
}

export async function deleteCourse(id: number, token?: string | undefined) {
  if (!token) throw new Error("Token no encontrado");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
