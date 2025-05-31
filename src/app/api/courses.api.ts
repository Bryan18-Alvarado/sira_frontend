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

export async function addCourse(courseData: CoursesData) {
  const token = "";
  const res = await fetch("http://localhost:4000/api/v1/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });
  return res.json();
}

export async function updateCourse(courseData: CoursesData, id: number) {
  const token = "";
  const res = await fetch(`http://localhost:4000/api/v1/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseData),
  });
  return res.json();
}

export async function deleteCourse(id: number) {
  const token = "";
  const res = await fetch(`http://localhost:4000/api/v1/courses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
