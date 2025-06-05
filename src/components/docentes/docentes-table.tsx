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

interface DocenteResponse {
  data: Docente[];
  total: number;
}

export function DocenteTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
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

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/docentes/add"
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
                  {docente.cursos_asignados?.nombre || "Sin cursos asignados"}
                </TableCell>
                <TableCell>{docente.direccion || "-"}</TableCell>
                <TableCell>{docente.fecha_ingreso}</TableCell>
                <TableCell>{docente.fecha_nacimiento}</TableCell>
                <TableCell>{docente.telefono || "-"}</TableCell>
                <TableCell>{docente.email}</TableCell>

                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/dashboard/docentes/${docente.id}`}>
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
                        await deleteDocente(docente.id);
                        setDocenteData((prev) => ({
                          ...prev,
                          data: prev.data.filter((c) => c.id !== docente.id),
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
