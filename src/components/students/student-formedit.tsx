"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import { StudentData } from "../../interface/estudiante.interface";
import { updateEstudent, getStudentById } from "../../app/api/estudent.api";
import { getAllGenders } from "../../app/api/genders.api";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { getAllTutores } from "../../app/api/tutores.api";
import { Tutor } from "../../interface/tutor.interface";
import { getDocenteById } from "../../app/api/docentes.api";
import { getAllCourses } from "../../app/api/courses.api";
import type { StudentCourse } from "../../interface/estudiante.interface";

interface OptionType {
  value: number;
  label: string;
}

export function StudentEditForm() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, control, setValue } = useForm<StudentData>();

  const [genderOptions, setGenderOptions] = useState<OptionType[]>([]);
  const [tutorOptions, setTutorOptions] = useState<OptionType[]>([]);
  const [courseOptions, setCourseOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    getAllGenders().then((res) => {
      const options = res.data.map((g: { id: number; name: string }) => ({
        value: g.id,
        label: g.name,
      }));
      setGenderOptions(options);
    });

    getAllTutores().then((res) => {
      const options = res.data.map((tutor: Tutor) => ({
        value: tutor.id,
        label: `${tutor.nombre} ${tutor.apellido}`,
      }));
      setTutorOptions(options);
    });
    getAllCourses(0, 100).then((res) => {
      const options = res.data.map((c: { id: number; nombre: string }) => ({
        value: c.id,
        label: c.nombre,
      }));
      setCourseOptions(options);
    });
  }, []);

  useEffect(() => {
    if (!id) return;
    getStudentById(Number(id)).then((student) => {
      setValue("nombre", student.nombre);
      setValue("apellido", student.apellido);
      setValue("fechaNacimiento", student.fechaNacimiento);
      setValue("genero_id", student.genero_id);
      setValue("telefono", student.telefono);
      // No seteamos ni enviamos user.id
      setValue("email", student.email);
      setValue("direccion", student.direccion);
      setValue("tutor_id", student.tutor_id);
      const cursosIds = student.studentCourses.map(
        (studentCourse: StudentCourse) => studentCourse.courses.id
      );
      setValue("cursos_ids", cursosIds);

      console.log("Datos seteados en formulario");
    });
  }, [id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (!session?.user?.token) {
      Swal.fire({
        icon: "error",
        title: "No autenticado",
        text: "Debes iniciar sesión para continuar.",
      });
      return;
    }

    // ✅ Asegura que `user` existe
    if (!data.user) {
      data.user = {};
    }

    // ✅ Genera un `userName` si no se proporciona
    data.user.userName =
      data.user.userName?.trim() ||
      `${data.nombre}${data.apellido}`.toLowerCase();

    // ✅ Sincroniza el email
    data.user.email = data.email;

    try {
      await updateEstudent(data, Number(id), session.user.token);

      Swal.fire({
        icon: "success",
        title: "Estudiante actualizado",
        confirmButtonColor: "#3085d6",
      });

      router.push("/dashboard/admin/students");
      router.refresh();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: error?.response?.data?.message || "Ocurrió un error inesperado.",
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Nombre</Label>
          <Input {...register("nombre")} className="w-full" />
        </div>

        <div>
          <Label>Apellido</Label>
          <Input {...register("apellido")} className="w-full" />
        </div>

        <div>
          <Label>Fecha de Nacimiento</Label>
          <Input
            {...register("fechaNacimiento")}
            type="date"
            className="w-full"
          />
        </div>

        <div>
          <Label>Género</Label>
          <Controller
            name="genero_id"
            control={control}
            render={({ field }) => {
              const selected =
                genderOptions.find((option) => option.value === field.value) ||
                null;
              return (
                <Select
                  {...field}
                  options={genderOptions}
                  value={selected}
                  onChange={(selected) =>
                    field.onChange(selected ? selected.value : null)
                  }
                  placeholder="Selecciona un género"
                  isClearable
                />
              );
            }}
          />
        </div>
        <div className="md:col-span-2">
          <Label>Cursos</Label>
          <Controller
            name="cursos_ids"
            control={control}
            render={({ field }) => {
              const selected = courseOptions.filter((option) =>
                field.value?.includes(option.value)
              );

              return (
                <Select
                  {...field}
                  options={courseOptions}
                  value={selected}
                  onChange={(selectedOptions) =>
                    field.onChange(
                      selectedOptions
                        ? selectedOptions.map((opt) => opt.value)
                        : []
                    )
                  }
                  placeholder="Selecciona los cursos"
                  isMulti
                />
              );
            }}
          />
        </div>

        <div>
          <Label>Teléfono</Label>
          <Input type="text" {...register("telefono")} className="w-full" />
        </div>

        <div>
          <Label>Email</Label>
          <Input {...register("email")} />
        </div>

        <div className="md:col-span-2">
          <Label>Dirección</Label>
          <Input {...register("direccion")} className="w-full" />
        </div>

        <div>
          <Label>Tutor</Label>
          <Controller
            name="tutor_id"
            control={control}
            render={({ field }) => {
              const selected =
                tutorOptions.find((option) => option.value === field.value) ||
                null;
              return (
                <Select
                  {...field}
                  options={tutorOptions}
                  value={selected}
                  onChange={(selected) =>
                    field.onChange(selected ? selected.value : null)
                  }
                  placeholder="Selecciona un tutor (opcional)"
                  isClearable
                />
              );
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className={buttonVariants({ variant: "agregar" })}
        >
          Actualizar Estudiante
        </Button>
      </div>
    </form>
  );
}
