"use client";

import { Categories } from "../../interface/categories.interface";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PiPlusCircleBold } from "react-icons/pi";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useEffect, useState } from "react";
import { deleteCategory, getAllCategories } from "../../app/api/categories.api";

interface CategoriesResponse {
  data: Categories[];
  total: number;
}

export function CategoriesTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [categoriesData, setCategoriesData] = useState<CategoriesResponse>({
    data: [],
    total: 0,
  });

  const loadCategories = async (newOffset: number) => {
    const result = await getAllCategories(newOffset, limit);
    setCategoriesData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadCategories(0);
  }, []);

  return (
    <div className="space-y-6 p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">Categorías</h1>
        <Link
          href="/dashboard/admin/categories/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-5 w-5" />
          Agregar categoría
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-left text-gray-600">ID</TableHead>
              <TableHead className="text-left text-gray-600">Nombre</TableHead>
              <TableHead className="text-left text-gray-600">
                Descripción
              </TableHead>
              <TableHead className="text-left text-gray-600">Estado</TableHead>
              <TableHead className="text-right text-gray-600">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriesData.data.map((category) => (
              <TableRow key={category.id} className="hover:bg-gray-50">
                <TableCell className="text-gray-700">{category.id}</TableCell>
                <TableCell className="text-gray-700">
                  {category.nombre}
                </TableCell>
                <TableCell className="text-gray-700">
                  {category.descripcion}
                </TableCell>
                <TableCell className="text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.status
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {category.status ? "Activo" : "Inactivo"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/dashboard/admin/categories/${category.id}`}>
                      <Button
                        size="sm"
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <BiPencil className="h-4 w-4" />
                        Editar
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700"
                      onClick={async () => {
                        await deleteCategory(category.id);
                        setCategoriesData((prev) => ({
                          ...prev,
                          data: prev.data.filter((c) => c.id !== category.id),
                          total: prev.total - 1,
                        }));
                      }}
                    >
                      <BiTrash className="h-4 w-4" />
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Mostrando {categoriesData.data.length} de {categoriesData.total}{" "}
          categorías
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={offset === 0}
            onClick={() => loadCategories(offset - limit)}
          >
            Anterior
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={offset + limit >= categoriesData.total}
            onClick={() => loadCategories(offset + limit)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
