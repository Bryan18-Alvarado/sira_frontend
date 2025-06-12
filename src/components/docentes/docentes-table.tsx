"use client";
import React, { useEffect, useState } from "react";
import { Docente } from "../../interface/docente.interface";
import { deleteDocente, getAllDocentes } from "../../app/api/docentes.api";
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
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

interface DocenteResponse {
  data: Docente[];
  total: number;
}

export function DocenteTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const { data: session } = useSession();

  const [docenteData, setDocenteData] = useState<DocenteResponse>({
    data: [],
    total: 0,
  });
  console.log(docenteData.data);
  const loadDocentes = async (newOffset: number) => {
    const result = await getAllDocentes(newOffset, limit);
    setDocenteData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadDocentes(0);
  }, []);

  const handeleteDocente = async (id: number) => {
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
        await deleteDocente(id, session?.user?.token);
        Swal.fire("Eliminado", "El docente ha sido eliminado.", "success");
        loadDocentes(offset);
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el docente.", "error");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/admin/docentes/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Docente
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="text-sm">
              <TableHead>ID</TableHead>
              <TableHead>Género</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Edad</TableHead>
              <TableHead>Estado Civil</TableHead>
              <TableHead>Código Laboral</TableHead>
              <TableHead>Cursos Asignados</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Ingreso</TableHead>
              <TableHead>Nacimiento</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docenteData.data.map((docente) => (
              <TableRow key={docente.id}>
                <TableCell className="font-medium">{docente.id}</TableCell>
                <TableCell>{docente.genero?.name || "Sin género"}</TableCell>
                <TableCell>{docente.nombre}</TableCell>
                <TableCell>{docente.apellido}</TableCell>
                <TableCell>{docente.edad}</TableCell>
                <TableCell>
                  {docente.estado_civil?.marital_status || "Sin estado"}
                </TableCell>
                <TableCell>{docente.codigo_laboral}</TableCell>
                <TableCell>
                  {docente.courses && docente.courses.length > 0
                    ? docente.courses.map((curso) => (
                        <span
                          key={curso.id}
                          className="mr-1 px-1 rounded bg-blue-100 text-blue-800 text-xs"
                        >
                          {curso.nombre}
                        </span>
                      ))
                    : "Sin cursos asignados"}
                </TableCell>

                <TableCell>{docente.direccion || "-"}</TableCell>
                <TableCell>{docente.fecha_ingreso}</TableCell>
                <TableCell>{docente.fecha_nacimiento}</TableCell>
                <TableCell>{docente.telefono || "-"}</TableCell>
                <TableCell>{docente.email}</TableCell>
                <TableCell>
                  {docente.image ? (
                    <img
                      src={`http://localhost:3000${docente.image}`}
                      alt={docente.nombre}
                      className="w-18 h-18 object-cover rounded-md"
                    />
                  ) : (
                    "Sin imagen"
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/dashboard/admin/docentes/${docente.id}`}>
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
                      onClick={() => handeleteDocente(docente.id)}
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

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          disabled={offset === 0}
          onClick={() => loadDocentes(Math.max(offset - limit, 0))}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(docenteData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= docenteData.total}
          onClick={() => loadDocentes(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default DocenteTable;
