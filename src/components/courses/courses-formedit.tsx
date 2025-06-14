"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import Select from "react-select";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

import { getCourseById, updateCourse } from "@/app/api/courses.api";
import { getAllCategories } from "@/app/api/categories.api";
import { getAllDocentes } from "@/app/api/docentes.api";

import { CoursesData, Course } from "@/interface/courses.interface";
import { getAllLevels } from "../../app/api/level.api";

interface OptionType {
  value: number;
  label: string;
}

export function CourseEditForm() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setError,
    formState: { errors },
  } = useForm<CoursesData>();

  const [categories, setCategories] = useState<OptionType[]>([]);
  const [levels, setLevels] = useState<OptionType[]>([]);
  const [docentes, setDocentes] = useState<OptionType[]>([]);

  // Cargar opciones de categorías, niveles y docentes
  useEffect(() => {
    getAllCategories(0, 100).then((res) => {
      const options = res.data.map((cat: { id: number; nombre: string }) => ({
        value: cat.id,
        label: cat.nombre,
      }));
      setCategories(options);
    });

    getAllLevels(0, 100).then((res) => {
      const options = res.data.map(
        (lvl: { id: number; level_course: string }) => ({
          value: lvl.id,
          label: lvl.level_course,
        })
      );
      setLevels(options);
    });

    getAllDocentes(0, 100).then((res) => {
      const options = res.data.map((doc: { id: number; nombre: string }) => ({
        value: doc.id,
        label: doc.nombre,
      }));
      setDocentes(options);
    });
  }, []);

  // Cargar datos del curso para edición
  useEffect(() => {
    if (!id) return;

    getCourseById(Number(id)).then((course: Course) => {
      setValue("codigo", course.codigo);
      setValue("nombre", course.nombre);
      setValue("descripcion", course.descripcion);
      setValue("duracion", course.duracion);
      setValue("horario", course.horario);
      setValue("fecha_inicio", course.fecha_inicio);
      setValue("fecha_fin", course.fecha_fin);
      setValue("cupos_disponibles", course.cupos_disponibles);
      setValue("precio", course.precio);
      setValue("requisitos", course.requisitos);
      setValue("categories_id", course.categories_id);
      setValue("level_id", course.level_id);
      setValue("docentes_id", course.docentes_id);
      setValue("status", course.status);
    });
  }, [id, setValue]);

  // Envío del formulario
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updateCourse(
        data,
        Number(id),
        session?.user?.token
      );

      // Validación de conflictos
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
        title: "Curso actualizado",
        confirmButtonColor: "#3085d6",
      });

      router.push("/dashboard/admin/courses");
      router.refresh();
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
          text: "Hubo un problema al actualizar el curso.",
        });
      }
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 p-4 max-w-4xl mx-auto"
      noValidate
    >
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Categoría</Label>
          <Controller
            name="categories_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                value={categories.find((o) => o.value === field.value) || null}
                onChange={(selected) => field.onChange(selected?.value)}
                placeholder="Selecciona una categoría"
                isClearable
              />
            )}
          />
        </div>

        <div>
          <Label>Nivel</Label>
          <Controller
            name="level_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={levels}
                value={levels.find((o) => o.value === field.value) || null}
                onChange={(selected) => field.onChange(selected?.value)}
                placeholder="Selecciona un nivel"
                isClearable
              />
            )}
          />
        </div>

        <div>
          <Label>Docente</Label>
          <Controller
            name="docentes_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={docentes}
                value={docentes.find((o) => o.value === field.value) || null}
                onChange={(selected) => field.onChange(selected?.value)}
                placeholder="Selecciona un docente"
                isClearable
              />
            )}
          />
        </div>

        <div>
          <Label>Estado</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: true, label: "Activo" },
                  { value: false, label: "Inactivo" },
                ]}
                value={
                  field.value !== undefined
                    ? {
                        value: field.value,
                        label: field.value ? "Activo" : "Inactivo",
                      }
                    : null
                }
                onChange={(selected) => field.onChange(selected?.value)}
                placeholder="Selecciona el estado"
                isClearable
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button className={buttonVariants({ variant: "agregar" })}>
          Actualizar Curso
        </Button>
      </div>
    </form>
  );
}
