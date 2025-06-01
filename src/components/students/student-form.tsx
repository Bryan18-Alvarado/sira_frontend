"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

export function StudentForm() {
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
    console.log(data);
    const result = await addStudent(data);
    console.log(result);
    router.push("/dashboard/students/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
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

      <Button type="submit" className={buttonVariants({ variant: "agregar" })}>
        Agregar Student
      </Button>
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
      setValue("correoElectronico", data.correoElectronico);
      setValue("direccion", data.direccion);
    });
  }, [id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await updateEstudent(data, Number(id));
    router.push("/dashboard/students/");
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
