"use client";
import React, { useEffect, useState } from "react";
import { Tutor } from "../../interface/tutor.interface";
import { deleteTutor, getAllTutores } from "../../app/api/tutores.api";
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

interface TutorResponse {
  data: Tutor[];
  totalItems: number;
}

export function TutorTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const { data: session } = useSession();

  const [tutorData, setTutorData] = useState<TutorResponse>({
    data: [],
    totalItems: 0,
  });

  const loadTutores = async (newOffset: number) => {
    const result = await getAllTutores(newOffset, limit);
    setTutorData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadTutores(0);
  }, []);

  const handleDeleteTutor = async (id: number) => {
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
        const response = await deleteTutor(id, session?.user?.token);
        console.log("Respuesta de eliminación:", response);

        Swal.fire(
          "Eliminado",
          response.message || "El tutor ha sido eliminado.",
          "success"
        );
        loadTutores(offset);
      } catch (error: any) {
        console.error("Error al eliminar:", error);

        Swal.fire(
          "Error",
          error.message || "No se pudo eliminar el tutor.",
          "error"
        );
      }
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/admin/tutores/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Tutor
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
              <TableHead>Estado Civil</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutorData.data.map((tutor) => (
              <TableRow key={tutor.id}>
                <TableCell className="font-medium">{tutor.id}</TableCell>
                <TableCell>{tutor.genero.name || "sin genero"}</TableCell>
                <TableCell>{tutor.nombre}</TableCell>
                <TableCell>{tutor.apellido}</TableCell>
                <TableCell>
                  {tutor.estado_civil.marital_status || "sin estado civil"}
                </TableCell>
                <TableCell>{tutor.telefono || "-"}</TableCell>
                <TableCell>{tutor.correoElectronico || "-"}</TableCell>
                <TableCell>{tutor.direccion || "-"}</TableCell>

                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/dashboard/admin/tutores/${tutor.id}`}>
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
                      onClick={() => handleDeleteTutor(tutor.id)}
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
          onClick={() => loadTutores(Math.max(offset - limit, 0))}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(tutorData.totalItems / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= tutorData.totalItems}
          onClick={() => loadTutores(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default TutorTable;
