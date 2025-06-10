"use client";

import { useEffect, useState } from "react";
import { deleteCourse, getAllCourses } from "../../app/api/courses.api";
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
import { Course } from "../../interface/courses.interface";
import Swal from "sweetalert2";
interface CoursesResponse {
  data: Course[];
  total: number;
}

export function CoursesTable() {
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [courseData, setCourseData] = useState<CoursesResponse>({
    data: [],
    total: 0,
  });
  console.log(courseData.data);
  const loadCourses = async (newOffset: number) => {
    const result = await getAllCourses(newOffset, limit);
    setCourseData(result);
    setOffset(newOffset);
  };

  useEffect(() => {
    loadCourses(0);
  }, []);

  const handleDeleteCourse = async (id: number) => {
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
        Swal.fire("Eliminado", "El curso ha sido eliminado.", "success");
        loadCourses(offset);
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el curso.", "error");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link
          href="/dashboard/admin/courses/add"
          className={buttonVariants({ variant: "agregar" })}
        >
          <PiPlusCircleBold className="mr-2 h-4 w-4" />
          Agregar course
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="text-sm">
              <TableHead>ID</TableHead>
              <TableHead>categorias</TableHead>
              <TableHead>level</TableHead>
              <TableHead>docente</TableHead>
              <TableHead>codigo</TableHead>
              <TableHead>nombre</TableHead>
              <TableHead>descripcion</TableHead>
              <TableHead>duracion</TableHead>
              <TableHead>horario</TableHead>
              <TableHead>fecha inicio</TableHead>
              <TableHead>fecha final</TableHead>
              <TableHead>cupos disponibles</TableHead>
              <TableHead>requisitos</TableHead>
              <TableHead>precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseData.data.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.id}</TableCell>
                <TableCell>
                  {course.categories?.nombre || "Sin categorias"}
                </TableCell>
                <TableCell>
                  {course.level?.level_course || "sin level"}
                </TableCell>
                <TableCell>
                  {course.docentes?.nombre || "sin docente"}
                </TableCell>
                <TableCell>{course.codigo}</TableCell>
                <TableCell>{course.nombre}</TableCell>
                <TableCell>{course.descripcion}</TableCell>
                <TableCell>{course.duracion}</TableCell>
                <TableCell>{course.horario}</TableCell>
                <TableCell>{course.fecha_inicio}</TableCell>
                <TableCell>{course.fecha_fin}</TableCell>
                <TableCell>{course.cupos_disponibles}</TableCell>
                <TableCell>{course.requisitos}</TableCell>
                <TableCell>{course.precio}</TableCell>
                <TableCell>{course.status ? "Activo" : "Inactivo"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Link href={`/dashboard/admin/courses/${course.id}`}>
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
                      onClick={() => handleDeleteCourse(course.id)}
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
          onClick={() => loadCourses(Math.max(offset - limit, 0))}
        >
          Anterior
        </Button>
        <span className="text-sm text-muted-foreground">
          Página {Math.floor(offset / limit) + 1} de{" "}
          {Math.ceil(courseData.total / limit)}
        </span>
        <Button
          variant="outline"
          className="hover:bg-gray-400/90"
          disabled={offset + limit >= courseData.total}
          onClick={() => loadCourses(offset + limit)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
