"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { LevelsData } from "../../interface/levels.interface";
import { addLevel } from "../../app/api/level.api";

export function LevelForm() {
  const { register, handleSubmit, setValue } = useForm<LevelsData>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const result = await addLevel(data);
    console.log(result);
    router.push("/dashboard/admin/levels/");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <div>
        <Label>Nombre del Nivel</Label>
        <Input {...register("level_course")} />
      </div>

      <Button type="submit" className={buttonVariants({ variant: "agregar" })}>
        Guardar Nivel
      </Button>
    </form>
  );
}
