"use client";

import React, { useEffect, useState } from "react";
import { useForm, set } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
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
import { StudentData, Student } from "../../interface/estudiante.interface";
import {
  addStudent,
  getEstudiantesAll,
  getStudentById,
  updateEstudent,
} from "../../app/api/estudent.api";
import { getAllGenders } from "../../app/api/genders.api";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export function StudentForm() {
  const { data: session } = useSession();
  const { register, handleSubmit, setValue } = useForm<StudentData>();
  const router = useRouter();
  const [genero, setGenero] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    register("genero_id", { required: true });
  }, [register]);

  useEffect(() => {
    const fetchGenders = async () => {
      const res = await getAllGenders(0, 100);
      setGenero(res.data);
    };
    fetchGenders();
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
      // Crear fullname automático y asociar email
      data.user = {
        fullName: `${data.nombre} ${data.apellido}`,
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
          <Select
            onValueChange={(value) => setValue("genero_id", parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un género" />
            </SelectTrigger>
            <SelectContent>
              {genero.map((g) => (
                <SelectItem key={g.id} value={g.id.toString()}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Teléfono</Label>
          <Input type="number" {...register("telefono")} className="w-full" />
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" {...register("email")} className="w-full" />
        </div>

        <div className="md:col-span-2">
          <Label>Dirección</Label>
          <Input {...register("direccion")} className="w-full" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className={buttonVariants({ variant: "agregar" })}
        >
          Agregar Student
        </Button>
      </div>
    </form>
  );
}

export function StudentEditForm() {
  const { id } = useParams();
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<StudentData>({});

  useEffect(() => {
    getStudentById(Number(id)).then((data) => {
      setValue("nombre", data.nombre);
      setValue("apellido", data.apellido);
      setValue("fechaNacimiento", data.fechaNacimiento);
      setValue("telefono", data.telefono);
      setValue("email", data.email);
      setValue("direccion", data.direccion);
    });
  }, [id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await updateEstudent(data, Number(id));
    router.push("admin/dashboard/students/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 max-w-4xl mx-auto">
      <div>
        <Label>Nombre</Label>
        <Input {...register("nombre")} />
      </div>

      <div>
        <Label>Apellido</Label>
        <Input {...register("apellido")} />
      </div>

      <div>
        <Label>Fecha de Nacimiento</Label>
        <Input {...register("fechaNacimiento")} type="date" />
      </div>
      <div>
        <Label>Teléfono</Label>
        <Input type="number" {...register("telefono")} />
      </div>

      <div>
        <Label>Email</Label>
        <Input type="email" {...register("correoElectronico")} />
      </div>

      <div>
        <Label>Dirección</Label>
        <Input {...register("direccion")} />
      </div>
      <Button className={buttonVariants({ variant: "agregar" })}>
        Actualizar Estudiante
      </Button>
    </form>
  );
}
