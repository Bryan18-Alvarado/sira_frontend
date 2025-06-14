"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

import { StudentData } from "../../interface/estudiante.interface";
import { addStudent } from "../../app/api/estudent.api";
import { getAllGenders } from "../../app/api/genders.api";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { getAllCourses } from "../../app/api/courses.api";
import { getAllTutores } from "../../app/api/tutores.api";

export function StudentForm() {
  const { data: session } = useSession();
  const { register, handleSubmit, control, setValue, watch } =
    useForm<StudentData>({
      defaultValues: {
        cursos_ids: [],
      },
    });
  const router = useRouter();

  const [genero, setGenero] = useState<{ id: number; name: string }[]>([]);
  const [cursos, setCursos] = useState<{ id: number; nombre: string }[]>([]);
  const [tutores, setTutores] = useState<{ id: number; nombre: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resCursos, resTutores, resGenero] = await Promise.all([
          getAllCourses(0, 100),
          getAllTutores(0, 100),
          getAllGenders(),
        ]);

        setCursos(resCursos.data);
        setTutores(resTutores.data);
        setGenero(resGenero.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    }

    fetchData();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!session?.user?.token) {
      Swal.fire({
        icon: "error",
        title: "No autenticado",
        text: "Debes iniciar sesión para continuar.",
      });
      return;
    }

    try {
      data.user = {
        userName: `${data.nombre} ${data.apellido}`,
        email: data.email,
      };

      await addStudent(data, session.user.token);

      Swal.fire({
        icon: "success",
        title: "Estudiante creado!",
        text: "El estudiante fue registrado correctamente.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        router.push("/dashboard/admin/students");
        router.refresh();
      });
    } catch (error: any) {
      console.error("Error al registrar estudiante:", error);
      if (error?.response?.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Estudiante duplicado",
          text: "Ya existe un estudiante con ese correo o número de teléfono.",
        });
        return;
      }

      Swal.fire({
        icon: "error",
        title: "Error al registrar estudiante",
        text:
          error?.response?.data?.message ||
          "Ocurrió un error al registrar el estudiante.",
      });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Nombre</Label>
          <Input
            {...register("nombre", { required: true })}
            className="w-full"
          />
        </div>

        <div>
          <Label>Apellido</Label>
          <Input
            {...register("apellido", { required: true })}
            className="w-full"
          />
        </div>

        <div>
          <Label>Fecha de Nacimiento</Label>
          <Input
            {...register("fechaNacimiento", { required: true })}
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
              const selectedGenero =
                genero
                  .map((genero) => ({ value: genero.id, label: genero.name }))
                  .find((option) => option.value === field.value) || null;

              return (
                <Select
                  {...field}
                  options={genero.map((genero) => ({
                    value: genero.id,
                    label: genero.name,
                  }))}
                  value={selectedGenero}
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
        <div>
          <Label>Teléfono</Label>
          <Input
            type="number"
            {...register("telefono", { required: true })}
            className="w-full"
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            {...register("email", { required: true })}
            className="w-full"
          />
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
              const selectedTutor =
                tutores
                  .map((tutor) => ({ value: tutor.id, label: tutor.nombre }))
                  .find((option) => option.value === field.value) || null;

              return (
                <Select
                  {...field}
                  options={tutores.map((tutor) => ({
                    value: tutor.id,
                    label: tutor.nombre,
                  }))}
                  value={selectedTutor}
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

        <div className="md:col-span-2">
          <Label>Cursos</Label>
          <Controller
            name="cursos_ids"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={cursos.map((curso) => ({
                  value: curso.id,
                  label: curso.nombre,
                }))}
                isMulti
                value={cursos
                  .filter((curso) => field.value?.includes(curso.id))
                  .map((curso) => ({
                    value: curso.id,
                    label: curso.nombre,
                  }))}
                onChange={(selected) =>
                  field.onChange(selected?.map((option) => option.value))
                }
                placeholder="Selecciona cursos"
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className={buttonVariants({ variant: "agregar" })}
        >
          Agregar Estudiante
        </Button>
      </div>
    </form>
  );
}
