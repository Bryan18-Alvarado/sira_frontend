"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CategoriesData } from "../../interface/categories.interface";
import { useParams, useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import Swal from "sweetalert2";
import { getCategoriesId, updateCategory } from "../../app/api/categories.api";

export function CategoriesEditForm() {
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoriesData>();

  // Cargar datos existentes de la categoría
  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        const category = await getCategoriesId(Number(id));

        setValue("nombre", category.nombre);
        setValue("descripcion", category.descripcion);
      } catch (error) {
        console.error("Error al cargar la categoría:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la categoría.",
        });
      }
    };

    fetchCategory();
  }, [id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateCategory(data, Number(id));
      Swal.fire({
        icon: "success",
        title: "Categoría actualizada",
        text: "La categoría se ha actualizado correctamente.",
      }).then(() => {
        router.push("/dashboard/admin/categories");
        router.refresh();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar la categoría.",
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            {...register("nombre", { required: "El nombre es requerido" })}
          />
          {errors.nombre && (
            <p className="text-sm text-red-500">{errors.nombre.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="descripcion">Descripción</Label>
          <Input
            id="descripcion"
            {...register("descripcion", {
              required: "La descripción es requerida",
            })}
          />
          {errors.descripcion && (
            <p className="text-sm text-red-500">{errors.descripcion.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className={buttonVariants({ variant: "agregar" })}>
        Actualizar Categoría
      </Button>
    </form>
  );
}
