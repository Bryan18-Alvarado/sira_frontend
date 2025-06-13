"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { getDocenteById, updateDocente } from "@/app/api/docentes.api";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { getAllCourses } from "../../app/api/courses.api";
import { Curso, Docente, DocenteData } from "../../interface/docente.interface";
import { getAllGenders } from "../../app/api/genders.api";
import { getAllMaritalStatus } from "../../app/api/estado-civil.api";

interface OptionType {
  value: number;
  label: string;
}

export function DocenteEditForm() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const { register, handleSubmit, setValue, control } = useForm<DocenteData>();

  const [coursesOptions, setCoursesOptions] = useState<OptionType[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<OptionType[]>([]);
  const [genderOptions, setGenderOptions] = useState<OptionType[]>([]);
  const [maritalStatusOptions, setMaritalStatusOptions] = useState<
    OptionType[]
  >([]);

  // Cargar opciones de cursos
  useEffect(() => {
    getAllCourses().then((res) => {
      const options = res.data.map((course: Curso) => ({
        value: course.id,
        label: course.nombre,
      }));
      setCoursesOptions(options);
    });
  }, []);

  // Cargar opciones de género y estado civil desde API
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

  // Cargar datos del docente para edición y precargar valores
  useEffect(() => {
    if (!id) return;

    getDocenteById(Number(id)).then((docente: Docente) => {
      setValue("nombre", docente.nombre);
      setValue("apellido", docente.apellido);
      setValue("edad", docente.edad);
      setValue("direccion", docente.direccion);
      setValue("telefono", docente.telefono);
      setValue("email", docente.email);
      setValue("fecha_ingreso", docente.fecha_ingreso);
      setValue("fecha_nacimiento", docente.fecha_nacimiento);

      setValue("genero_id", docente.genero_id);
      setValue("estado_civil_id", docente.estado_civil_id);

      // Mapear cursos asignados para react-select
      const assignedCourses = (docente.courses ?? []).map((curso: Curso) => ({
        value: curso.id,
        label: curso.nombre,
      }));
      setSelectedCourses(assignedCourses);

      const cursosIds = (docente.courses ?? []).map((curso: Curso) => curso.id);
      setValue("cursos_ids", cursosIds);
    });
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
      await updateDocente(data, Number(id), session.user.token);

      Swal.fire({
        icon: "success",
        title: "Docente actualizado",
        confirmButtonColor: "#3085d6",
      });

      router.push("/dashboard/admin/docentes");
      router.refresh();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar",
        text: error?.response?.data?.message || "Ocurrió un error inesperado.",
      });
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
          <Label>Edad</Label>
          <Input type="number" {...register("edad", { valueAsNumber: true })} />
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
                placeholder="Selecciona género"
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

        <div className="col-span-2">
          <Label>Cursos Asignados</Label>
          <Controller
            name="cursos_ids"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={coursesOptions}
                isMulti
                value={coursesOptions.filter((option) =>
                  field.value?.includes(option.value)
                )}
                onChange={(selected) => {
                  field.onChange(selected?.map((c) => c.value));
                  setSelectedCourses(selected as OptionType[]);
                }}
                placeholder="Selecciona cursos"
              />
            )}
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
      </div>

      <div className="pt-4">
        <Button className={buttonVariants({ variant: "agregar" })}>
          Actualizar Docente
        </Button>
      </div>
    </form>
  );
}
