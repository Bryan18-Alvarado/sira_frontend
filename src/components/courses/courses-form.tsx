"use client";

import { useParams, useRouter } from "next/navigation";
import { Controller } from "react-hook-form";

import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { getAllCategories } from "../../app/api/categories.api";
import { Course, CoursesData } from "../../interface/courses.interface";
import {
  addCourse,
  getCourseById,
  updateCourse,
} from "../../app/api/courses.api";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { getAllDocentes } from "../../app/api/docentes.api";
import { getAllLevels } from "../../app/api/level.api";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export const metadata = {
  title: "Agregar Course",
  description: "Agregar un nuevo course al sistema",
};

export function CoursesForm() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CoursesData>();
  const router = useRouter();

  const [categories, setCategories] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [levels, setLevels] = useState<{ id: number; level_course: string }[]>(
    []
  );
  const [docentes, setDocentes] = useState<{ id: number; nombre: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories(0, 100);
      setCategories(res.data);
    };
    const fetchLevels = async () => {
      const res = await getAllLevels(0, 100);
      setLevels(res.data);
    };
    const fetchDocentes = async () => {
      const res = await getAllDocentes(0, 100);
      setDocentes(res.data);
    };

    fetchCategories();
    fetchLevels();
    fetchDocentes();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await addCourse(data, session?.user?.token);
      if (response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Datos duplicados",
          text: "Ya existe un curso con ese código u horario.",
        });
        return;
      }
      Swal.fire({
        icon: "success",
        title: "Curso agregado",
        text: "El curso se ha agregado correctamente.",
      }).then(() => {
        router.push("/dashboard/admin/courses");
        router.refresh();
      });
    } catch (error: any) {
      const message = error?.response?.data?.message;

      if (message?.includes("codigo")) {
        setError("codigo", {
          type: "manual",
          message: "Ya existe un curso con este código.",
        });
      }

      if (message?.includes("horario")) {
        setError("horario", {
          type: "manual",
          message: "Ya existe un curso en este horario.",
        });
      }

      if (!message?.includes("codigo") && !message?.includes("horario")) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al agregar el curso.",
        });
      }
      if (error?.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Datos duplicados",
          text: "Ya existe un curso con ese código u horario. Por favor, verifica los datos ingresados.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al agregar el curso.",
        });
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Código</Label>
          <Input {...register("codigo")} />
          {errors.codigo && (
            <p className="text-sm text-red-500">{errors.codigo.message}</p>
          )}
        </div>
        <div>
          <Label>Nombre</Label>
          <Input {...register("nombre")} />
        </div>

        <div className="md:col-span-2">
          <Label>Descripción</Label>
          <Input {...register("descripcion")} />
        </div>

        <div>
          <Label>Duración</Label>
          <Input {...register("duracion")} />
        </div>
        <div>
          <Label>Horario</Label>
          <Input {...register("horario")} />
          {errors.horario && (
            <p className="text-sm text-red-500">{errors.horario.message}</p>
          )}
        </div>

        <div>
          <Label>Fecha de Inicio</Label>
          <Input type="date" {...register("fecha_inicio")} />
        </div>
        <div>
          <Label>Fecha de Finalización</Label>
          <Input type="date" {...register("fecha_fin")} />
        </div>

        <div>
          <Label>Cupos Disponibles</Label>
          <Input
            type="number"
            {...register("cupos_disponibles", { valueAsNumber: true })}
          />
        </div>
        <div>
          <Label>Precio</Label>
          <Input
            type="number"
            {...register("precio", { valueAsNumber: true })}
          />
        </div>

        <div className="md:col-span-2">
          <Label>Requisitos</Label>
          <Input {...register("requisitos")} />
        </div>

        <div>
          <Label>Categoría</Label>
          <Select
            onValueChange={(value) =>
              setValue("categories_id", parseInt(value))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((categories) => (
                <SelectItem
                  key={categories.id}
                  value={categories.id.toString()}
                >
                  {categories.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Nivel</Label>
          <Select
            onValueChange={(value) => setValue("level_id", parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un nivel" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((lvl) => (
                <SelectItem key={lvl.id} value={lvl.id.toString()}>
                  {lvl.level_course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Docente</Label>
          <Select
            onValueChange={(value) => setValue("docentes_id", parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un docente" />
            </SelectTrigger>
            <SelectContent>
              {docentes.map((doc) => (
                <SelectItem key={doc.id} value={doc.id.toString()}>
                  {doc.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Estado</Label>
        <Select onValueChange={(value) => setValue("status", value === "true")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona el estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Activo</SelectItem>
            <SelectItem value="false">Inactivo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="pt-4">
        <Button className={buttonVariants({ variant: "agregar" })}>
          Agregar Curso
        </Button>
      </div>
    </form>
  );
}
