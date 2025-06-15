import {
  CategoriesData,
  CategoriesResponse,
} from "../../interface/categories.interface";

export async function getAllCategories(
  offset: number = 0,
  limit: number = 5
): Promise<CategoriesResponse> {
  const response = await fetch(
    `http://localhost:4000/api/v1/categories?offset=${Number(
      offset
    )}&limit=${Number(limit)}`,
    { cache: "no-store" }
  );

  return await response.json();
}

export async function addCategory(categoriesData: CategoriesData) {
  const res = await fetch("http://localhost:4000/api/v1/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoriesData),
  });
  return res.json();
}

export async function updateCategory(
  categoriesData: CategoriesData,
  id: number
) {
  const res = await fetch(`http://localhost:4000/api/v1/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoriesData),
  });
  return res.json();
}

export async function getCategoriesId(id: number): Promise<CategoriesData> {
  const res = await fetch(`http://localhost:4000/api/v1/categories/${id}`);
  const response = await res.json();
  return response;
}

export async function deleteCategory(id: number) {
  const res = await fetch(`http://localhost:4000/api/v1/categories/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
