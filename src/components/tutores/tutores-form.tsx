// src/components/Tutores/TutorForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { addTutor } from "@/app/api/tutores.api";
import { getAllGenders } from "@/app/api/genders.api";
import { getAllMaritalStatus } from "@/app/api/estado-civil.api";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import Swal from "sweetalert2";

export function TutorForm() {
  const { data: session } = useSession();
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

  const [genders, setGenders] = useState<{ id: number; name: string }[]>([]);
  const [maritalStatus, setMaritalStatus] = useState<
    { id: number; marital_status: string }[]
  >([]);

  useEffect(() => {
    getAllGenders(0, 100).then((res) => setGenders(res.data));
    getAllMaritalStatus(0, 100).then((res) => setMaritalStatus(res.data));
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!session?.user?.token) {
      Swal.fire("Error", "Debes iniciar sesión", "error");
      return;
    }

    try {
      await addTutor(data, session.user.token);
      Swal.fire("Tutor creado", "El tutor ha sido registrado", "success").then(
        () => {
          router.push("/dashboard/admin/tutores");
          router.refresh();
        }
      );
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
    }
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
          <Label>Teléfono</Label>
          <Input {...register("telefono")} />
        </div>
        <div>
          <Label>Correo Electrónico</Label>
          <Input {...register("correoElectronico")} />
        </div>
        <div>
          <Label>Dirección</Label>
          <Input {...register("direccion")} />
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
        <Button>Agregar Tutor</Button>
      </div>
    </form>
  );
}
