"use client";

import { useEffect, useState } from "react";
import { Student, StudentResponse } from "../../interface/estudiante.interface";
import { deleteStudent, getEstudiantesAll } from "../../app/api/estudent.api";
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

// interface StudentResponse {
//   data: Student[];
//   total: number;
// }

export function StudentTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [studentData, setStudentData] = useState<StudentResponse>({
    data: [],
    total: 0,
  });

  const loadStudent = async (newOffset: number) => {
    const result = await getEstudiantesAll(newOffset, limit);
    setStudentData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadStudent(0);
  }, []);

  const handDeleteStudent = async (id: number) => {
    await deleteStudent(id);
    loadStudent(offset);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/students/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar Auto
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>FechaNacimiento</TableHead>
              <TableHead>genero</TableHead>
              <TableHead>telefono</TableHead>
              <TableHead>correoElectronico</TableHead>
              <TableHead>direccion</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentData?.data?.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>{student.nombre}</TableCell>
                <TableCell>{student.apellido}</TableCell>
                <TableCell>
                  {new Date(student.fechaNacimiento).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </TableCell>{" "}
                <TableCell>{student.genero?.nombre || "Sin genero"}</TableCell>
                <TableCell>{student.telefono}</TableCell>
                <TableCell>{student.correoElectronico}</TableCell>
                <TableCell>{student.direccion}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/dashboard/estudents/${student.id}/edit`}>
                      <Button
                        size="sm"
                        className="bg-blue-600 text-white :hover:bg-blue-700"
                      >
                        <BiPencil className="h-4 w-4" />
                        Editar
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="bg-destructive text-destructive-foreground"
                      onClick={() => handDeleteStudent(student.id)}
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
          onClick={() => loadStudent(offset - limit)}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(studentData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= studentData.total}
          onClick={() => loadStudent(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default StudentTable;
