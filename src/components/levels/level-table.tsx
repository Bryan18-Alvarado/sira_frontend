"use client";

import { use, useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { PiPlusCircleBold } from "react-icons/pi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { BiPencil, BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import { get } from "http";
import { getAllLevels } from "../../app/api/level.api";

export function LevelTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [levelData, setLevelData] = useState<{ data: any[]; total: number }>({
    data: [],
    total: 0,
  });

  const loadLevels = async (newOffset: number) => {
    const result = await getAllLevels(newOffset, limit);
    setLevelData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadLevels(0);
  }, []);

  const handleDeleteLevel = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás deshacer esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        // Aquí deberías llamar a la función para eliminar el nivel
        // await deleteLevel(id);
        Swal.fire("Eliminado", "El nivel ha sido eliminado.", "success");
        loadLevels(offset);
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el nivel.", "error");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-x-4">
        <Link
          href="/dashboard/admin/levels/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Nivel
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {levelData.data.map((level) => (
            <TableRow key={level.id}>
              <TableCell className="font-medium">{level.id}</TableCell>
              <TableCell>{level.level_course}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Link href={`/dashboard/admin/levels/${level.id}`}>
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <BiPencil className="h-4 w-4" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="bg-destructive text-destructive-foreground"
                    onClick={() => handleDeleteLevel(level.id)}
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
  );
}
