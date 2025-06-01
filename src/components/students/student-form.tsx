"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { addStudent, getEstudiantesAll } from "../../app/api/estudent.api";

export function StudentForm() {
  const { register, handleSubmit, setValue } = useForm<StudentData>();
  const router = useRouter();
  const [genero, setGenero] = useState<{ id: number; nombre: string }[]>([]);

  useEffect(() => {
    const fetchGenero = async () => {
      const res = await getEstudiantesAll(0, 100);
      setGenero(res.data);
    };
    fetchGenero();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await addStudent(data);
    router.push("/dashboard/students/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Label>Nombre</Label>
      <Input {...register("nombre")} />
      <Label>Apellido</Label>
      <Input {...register("apellido")} />
      <Label>FechaNacimiento</Label>
      <Input
        type="number"
        {...register("fechaNacimiento", { valueAsNumber: true })}
      />
      <Label>telefono</Label>
      <Input type="number" {...register("telefono", { valueAsNumber: true })} />

      <Label>Student</Label>
      <Select onValueChange={(value) => setValue("generoId", parseInt(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona un genero" />
        </SelectTrigger>
        <SelectContent>
          {genero.map((genero) => (
            <SelectItem key={genero.id} value={genero.id.toString()}>
              {genero.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className={buttonVariants({ variant: "agregar" })}>
        Agregar Student
      </Button>
    </form>
  );
}
