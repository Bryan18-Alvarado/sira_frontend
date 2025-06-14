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

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        console.log("Fetch data para estudiante ID:", id);

        const [resTutores, resGenders, student] = await Promise.all([
          getAllTutores(0, 100),
          getAllGenders(),
          getStudentById(Number(id)),
        ]);

        console.log("Student cargado:", student);

        setTutorOptions(
          resTutores.data.map((t: Tutor) => ({
            value: t.id,
            label: t.nombre,
          }))
        );

        setGenderOptions(
          resGenders.data.map((g) => ({ value: g.id, label: g.name }))
        );

        const fechaFormateada = student.fechaNacimiento
          ? new Date(student.fechaNacimiento).toISOString().split("T")[0]
          : "";

        setValue("nombre", student.nombre);
        setValue("apellido", student.apellido);
        setValue("fechaNacimiento", fechaFormateada);
        setValue("genero_id", student.genero_id);
        setValue("telefono", student.telefono);
        // No seteamos ni enviamos user.id
        setValue("user.email", student.user.email || "");
        setValue("direccion", student.direccion || "");
        setValue("tutor_id", student.tutor_id);

        console.log("Datos seteados en formulario");
      } catch (error) {
        console.error("Error cargando datos:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la información del estudiante.",
        });
      }
    }
    fetchData();
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

    try {
      // Crear objeto sin user.id
      const payload = {
        ...data,
        user: {
          email: data.user.email,
          userName: `${data.nombre} ${data.apellido}`,
        },
      };

      console.log("Datos enviados al backend:", payload);

      await updateEstudent(payload, Number(id), session.user.token);

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
        title: "Error al actualizar estudiante",
        text:
          error?.response?.data?.message ||
          "Ocurrió un error al actualizar el estudiante.",
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

        <div>
          <Label>Teléfono</Label>
          <Input
            type="text"
            {...register("telefono", { required: true })}
            className="w-full"
          />
        </div>

        <div>
          <Label>Email</Label>
          <Controller
            name="user.email"
            control={control}
            render={({ field }) => (
              <Input {...field} type="email" className="w-full" />
            )}
          />
        </div>

        {/* No hay input oculto para user.id */}

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
