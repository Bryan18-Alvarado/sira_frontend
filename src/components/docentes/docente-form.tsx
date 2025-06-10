"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import {
  addDocente,
  getDocenteById,
  updateDocente,
} from "@/app/api/docentes.api";
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
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export const metadata = {
  title: "Agregar Docente",
  description: "Agregar un nuevo docente al sistema",
};

export function DocenteForm() {
  const { data: session } = useSession();
  const { register, handleSubmit, setValue } = useForm<DocenteData>();
  const router = useRouter();

  const [genders, setGenders] = useState<{ id: number; name: string }[]>([]);
  const [maritalStatus, setMaritalStatus] = useState<
    { id: number; marital_status: string }[]
  >([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    getAllGenders(0, 100).then((res) => setGenders(res.data));
    getAllMaritalStatus(0, 100).then((res) => setMaritalStatus(res.data));
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
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      if (imageFile) formData.append("file", imageFile);

      await addDocente(formData, session.user.token);

      Swal.fire({
        icon: "success",
        title: "¡Docente creado!",
        text: "El docente fue registrado correctamente.",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        router.push("/dashboard/admin/docentes");
        router.refresh();
      });
    } catch (error: any) {
      if (error?.response?.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Docente duplicado",
          text: "Ya existe un docente con ese código laboral o correo.",
        });
        return;
      }

      Swal.fire({
        icon: "error",
        title: "Error al registrar docente",
        text: error?.response?.data?.message || "Ocurrió un error inesperado.",
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Nombre</Label>
          <Input {...register("nombre")} />
        </div>
        <div>
          <Label>Apellido</Label>
          <Input {...register("apellido")} />
        </div>
        <div>
          <Label>Edad</Label>
          <Input type="number" {...register("edad", { valueAsNumber: true })} />
        </div>
        <div>
          <Label>Código Laboral</Label>
          <Input
            type="number"
            {...register("codigo_laboral", {
              valueAsNumber: true,
              min: 5,
              required: true,
            })}
          />
        </div>
        <div>
          <Label>Imagen</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <Label>Dirección</Label>
          <Input {...register("direccion")} />
        </div>
        <div>
          <Label>Teléfono</Label>
          <Input {...register("telefono")} />
        </div>
        <div>
          <Label>Email</Label>
          <Input {...register("email")} />
        </div>
        <div>
          <Label>Fecha Ingreso</Label>
          <Input {...register("fecha_ingreso")} type="date" />
        </div>
        <div>
          <Label>Fecha Nacimiento</Label>
          <Input {...register("fecha_nacimiento")} type="date" />
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
              {genders.map((gender) => (
                <SelectItem key={gender.id} value={gender.id.toString()}>
                  {gender.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Estado Civil</Label>
          <Select
            onValueChange={(value) =>
              setValue("estado_civil_id", parseInt(value))
            }
          >
            <SelectTrigger className="w-full">
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
        </div>
      </div>

      <div className="pt-4">
        <Button className={buttonVariants({ variant: "agregar" })}>
          Agregar Docente
        </Button>
      </div>
    </form>
  );
}

export function DocenteEditForm() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<DocenteData>();

  const onSubmit = handleSubmit(async (data) => {
    await updateDocente(data, Number(id), session?.user?.token);
    router.push("/dashboard/docentes/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Nombre</Label>
          <Input {...register("nombre")} />
        </div>
        <div>
          <Label>Apellido</Label>
          <Input {...register("apellido")} />
        </div>
        <div>
          <Label>Edad</Label>
          <Input type="number" {...register("edad", { valueAsNumber: true })} />
        </div>
        <div>
          <Label>Código Laboral</Label>
          <Input
            type="number"
            {...register("codigo_laboral", {
              valueAsNumber: true,
              min: 5,
              required: true,
            })}
          />
        </div>
        <div className="md:col-span-2">
          <Label>Cursos Asignados</Label>
          <Input {...register("cursos_asignados")} />
        </div>
        <div>
          <Label>Dirección</Label>
          <Input {...register("direccion")} />
        </div>
        <div>
          <Label>Teléfono</Label>
          <Input {...register("telefono")} />
        </div>
        <div>
          <Label>Email</Label>
          <Input {...register("email")} />
        </div>
        <div>
          <Label>Fecha Ingreso</Label>
          <Input {...register("fecha_ingreso")} type="date" />
        </div>
        <div>
          <Label>Fecha Nacimiento</Label>
          <Input {...register("fecha_nacimiento")} type="date" />
        </div>
      </div>

      <div className="pt-4">
        <Button className={buttonVariants({ variant: "agregar" })}>
          Actualizar Docente
        </Button>
      </div>
    </form>
  );
}
