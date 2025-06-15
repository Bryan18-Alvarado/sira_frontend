"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";

export function UpdateEstudianteImageForm({
  estudianteId,
}: {
  estudianteId: number;
}) {
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      Swal.fire({
        icon: "warning",
        title: "Selecciona una imagen",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/estudiantes/${estudianteId}/upload-image`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Error subiendo imagen");

      await Swal.fire({
        icon: "success",
        title: "Imagen subida correctamente",
        confirmButtonText: "OK",
      }).then(() => {
        router.push(`/dashboard/admin/students/profile/${estudianteId}`);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al subir imagen",
        text: (error as Error).message || "",
      });
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <Label>Imagen del Estudiante</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
          }
        }}
      />
      <Button type="submit">Actualizar Imagen</Button>
    </form>
  );
}
