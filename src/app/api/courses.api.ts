import {
  CoursesData,
  CoursesResponse,
} from "../../interface/courses.interface";

export async function getAllCourses(
  offset: number = 0,
  limit: number = 5
): Promise<CoursesResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/courses?offset=${Number(
      offset
    )}&limit=${Number(limit)}`,
    { cache: "no-store" }
  );

  return await response.json();
}

export async function addCourse(
  courseData: CoursesData,
  token: string | undefined
) {
  if (!token) throw new Error("Token no encontrado");

  const res = await fetch("http://localhost:4000/api/v1/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Error al agregar el curso") as any;
    error.response = { status: res.status, data };
    throw error;
  }

  return data;
}

export async function updateCourse(
  courseData: CoursesData,
  id: number,
  token: string | undefined
) {
  if (!token) throw new Error("Token no encontrado");

  const res = await fetch(`http://localhost:4000/api/v1/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(
      data.message || "Error al actualizar el curso"
    ) as any;
    error.response = { status: res.status, data };
    throw error;
  }

  return data;
}

export async function deleteCourse(id: number, token: string | undefined) {
  if (!token) throw new Error("Token no encontrado");
  const res = await fetch(`http://localhost:4000/api/v1/courses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
