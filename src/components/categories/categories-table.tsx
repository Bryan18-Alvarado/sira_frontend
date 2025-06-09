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
    // Replace with your API call to fetch categories
    const result = await getAllCategories(newOffset, limit);
    setCategoriesData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadCategories(0);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/admin/categories/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar categoria
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="text-sm">
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoriesData.data.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.nombre}</TableCell>
                <TableCell>{category.descripcion}</TableCell>
                <TableCell>{category.status ? "Activo" : "Inactivo"}</TableCell>
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
                      className="bg-destructive text-destructive-foreground"
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
    </div>
  );
}
