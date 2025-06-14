"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

import { getTutorById, updateTutor } from "@/app/api/tutores.api";
import { getAllGenders } from "@/app/api/genders.api";
import { getAllMaritalStatus } from "@/app/api/estado-civil.api";

interface OptionType {
  value: number;
  label: string;
}

interface TutorData {
  nombre: string;
  apellido: string;
  telefono: string;
  correoElectronico: string;
  direccion: string;
  genero_id: number | null;
  estado_civil_id: number | null;
}

export function TutorEditForm() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, setValue, control } = useForm<TutorData>();

  const [genderOptions, setGenderOptions] = useState<OptionType[]>([]);
  const [maritalStatusOptions, setMaritalStatusOptions] = useState<
    OptionType[]
  >([]);

  useEffect(() => {
    getAllGenders().then((res) => {
      const options = res.data.map((g: { id: number; name: string }) => ({
        value: g.id,
        label: g.name,
      }));
      setGenderOptions(options);
    });

    getAllMaritalStatus().then((res) => {
      const options = res.data.map(
        (e: { id: number; marital_status: string }) => ({
          value: e.id,
          label: e.marital_status,
        })
      );
      setMaritalStatusOptions(options);
    });
  }, []);

  useEffect(() => {
    console.log("Cargando datos del tutor con ID:", id);
    if (!id) return;

    getTutorById(Number(id)).then((tutor) => {
      if (!tutor) {
        // Aquí puedes manejar el error, por ejemplo mostrar mensaje o redirigir
        console.error("Tutor no encontrado");
        return;
      }

      setValue("nombre", tutor.nombre);
      setValue("apellido", tutor.apellido);
      setValue("telefono", tutor.telefono ?? "");
      setValue("correoElectronico", tutor.correoElectronico ?? "");
      setValue("estado_civil_id", tutor.estado_civil_id);
      setValue("direccion", tutor.direccion ?? "");
      setValue("genero_id", tutor.genero_id);
    });
  }, [id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (!session?.user?.token) {
      Swal.fire("Error", "Debes iniciar sesión para continuar.", "error");
      return;
    }

    try {
      await updateTutor(data, Number(id), session.user.token);

      Swal.fire(
        "Tutor actualizado",
        "El tutor ha sido actualizado exitosamente.",
        "success"
      ).then(() => {
        router.push("/dashboard/admin/tutores");
        router.refresh();
      });
    } catch (error: any) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Error inesperado",
        "error"
      );
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 p-4 max-w-4xl mx-auto"
      noValidate
    >
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
          <Controller
            name="genero_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={genderOptions}
                value={
                  genderOptions.find((o) => o.value === field.value) || null
                }
                onChange={(selected) => field.onChange(selected?.value)}
                placeholder="Selecciona un género"
                isClearable
              />
            )}
          />
        </div>
        <div>
          <Label>Estado Civil</Label>
          <Controller
            name="estado_civil_id"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={maritalStatusOptions}
                value={
                  maritalStatusOptions.find((o) => o.value === field.value) ||
                  null
                }
                onChange={(selected) => field.onChange(selected?.value)}
                placeholder="Selecciona estado civil"
                isClearable
              />
            )}
          />
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit">Actualizar Tutor</Button>
      </div>
    </form>
  );
}
