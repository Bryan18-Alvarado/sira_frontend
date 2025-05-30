"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addDocente, updateDocente } from "@/app/api/docentes.api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { getAllGenders } from "../../app/api/genders.api";
import { DocenteData } from "../../interface/docente.interface";
import { getAllMaritalStatus } from "../../app/api/estado-civil.api";

export const metadata = {
  title: "Agregar Docente",
  description: "Agregar un nuevo docente al sistema",
};

export function DocenteForm() {
  const { register, handleSubmit, setValue } = useForm<DocenteData>();
  const router = useRouter();
  const [genders, setGenders] = useState<{ id: number; name: string }[]>([]);
  const [maritalStatus, setMaritalStatus] = useState<
    { id: number; marital_status: string }[]
  >([]);

  useEffect(() => {
    const fetchGenders = async () => {
      const res = await getAllGenders(0, 100);
      setGenders(res.data);
    };
    fetchGenders();
  }, []);

  useEffect(() => {
    const fetchMaritalStatus = async () => {
      const res = await getAllMaritalStatus(0, 100);
      setMaritalStatus(res.data);
    };
    fetchMaritalStatus();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await addDocente(data);
    router.push("/dashboard/docentes");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Label>Nombre</Label>
      <Input {...register("nombre")} />
      <Label>apellido</Label>
      <Input {...register("apellido")} />
      <Label>edad</Label>
      <Input type="number" {...register("edad", { valueAsNumber: true })} />
      <Label>codigo laboral</Label>
      <Input
        type="number"
        {...register("codigo_laboral", {
          valueAsNumber: true,
          min: 5,
          required: true, // si es obligatorio
        })}
      />
      <Label>cursos asignados</Label>
      <Input {...register("cursos_asignados")} />
      <Label>direccion</Label>
      <Input {...register("direccion")} />
      <Label>fecha ingreso</Label>
      <Input {...register("fecha_ingreso")} type="date" />
      <Label>fecha nacimiento</Label>
      <Input {...register("fecha_nacimiento")} type="date" />
      <Label>telefono</Label>
      <Input {...register("telefono")} />
      <Label>email</Label>
      <Input {...register("email")} />

      <Label>Genero</Label>
      <Select onValueChange={(value) => setValue("genero_id", parseInt(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona un genero" />
        </SelectTrigger>
        <SelectContent>
          {genders.map((gender) => (
            <SelectItem key={gender.id} value={gender.id.toString()}>
              {gender.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label>Estado Civil</Label>
      <Select
        onValueChange={(value) => setValue("estado_civil_id", parseInt(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona tu estado civil" />
        </SelectTrigger>
        <SelectContent>
          {maritalStatus.map((estado) => (
            <SelectItem key={estado.id} value={estado.id.toString()}>
              {estado.marital_status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className={buttonVariants({ variant: "agregar" })}>
        Agregar Docente
      </Button>
    </form>
  );
}
