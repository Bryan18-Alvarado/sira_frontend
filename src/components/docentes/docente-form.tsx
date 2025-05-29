"use client";
import { DocenteData } from "@/interfaces/docente.interface";
import { useParams, useRouter } from "next/navigation";
import { getAllDocentes } from "../../app/api/docente.api";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { addDocente, updateDocente } from "@/app/api/docente.api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export function DocenteForm() {
  const { register, handleSubmit, setValue } = useForm<DocenteData>();
  const router = useRouter();
  const [docentes, setDocente] = useState<{ id: number; nombre: string }[]>([]);

  useEffect(() => {
    const fetchDocentes = async () => {
      const res = await getAllDocentes(0, 100);
      setDocente(res.data);
    };
    fetchDocentes();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    await addDocente(data);
    router.push("/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Label>Nombre</Label>
      <Input {...register("nombre")} />
      <Label>apellido</Label>
      <Input {...register("apellido")} />
      <Label>edad</Label>
      <Input {...register("edad")} />
      <Label>codigo laboral</Label>
      <Input {...register("codigo_laboral")} />
      <Label>cursos asignados</Label>
      <Input {...register("cursos_asignados")} />
      <Label>direccion</Label>
      <Input {...register("direccion")} />
      <Label>fecha ingreso</Label>
      <Input {...register("fecha_ingreso")} />
      <Label>fecha nacimiento</Label>
      <Input {...register("fecha_nacimiento")} />
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
          {docentes.map((docente) => (
            <SelectItem key={docente.id} value={docente.id.toString()}>
              {docente.nombre}
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
