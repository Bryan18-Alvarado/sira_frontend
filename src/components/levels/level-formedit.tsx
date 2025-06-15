"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { LevelsData } from "../../interface/levels.interface";
import { getLevelById, updateLevel } from "../../app/api/level.api";
import Swal from "sweetalert2";

export function LevelEditForm() {
  const { id } = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LevelsData>();

  // Cargar datos del nivel
  useEffect(() => {
    if (!id) return;

    const fetchLevel = async () => {
      try {
        const level = await getLevelById(Number(id));

        setValue("level_course", level.level_course);
      } catch (error) {
        console.error("Error al cargar el nivel:", error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el nivel.",
        });
      }
    };

    fetchLevel();
  }, [id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateLevel(data, Number(id));

      Swal.fire({
        icon: "success",
        title: "Nivel actualizado",
        text: "El nivel se ha actualizado correctamente.",
      }).then(() => {
        router.push("/dashboard/admin/levels/");
        router.refresh();
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar el nivel.",
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <div>
        <Label>Nombre del Nivel</Label>
        <Input
          {...register("level_course", { required: "El nombre es requerido" })}
        />
        {errors.level_course && (
          <p className="text-sm text-red-500">{errors.level_course.message}</p>
        )}
      </div>

      <Button type="submit" className={buttonVariants({ variant: "agregar" })}>
        Actualizar Nivel
      </Button>
    </form>
  );
}
