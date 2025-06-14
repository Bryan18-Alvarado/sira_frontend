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
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<DocenteData>();
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [genders, setGenders] = useState<{ id: number; name: string }[]>([]);
  const [maritalStatus, setMaritalStatus] = useState<
    { id: number; marital_status: string }[]
  >([]);

  useEffect(() => {
    getAllGenders(0, 100).then((res) => setGenders(res.data));
    getAllMaritalStatus(0, 100).then((res) => setMaritalStatus(res.data));
  }, []);

  const formData = new FormData();
  if (imageFile) {
    formData.append("image", imageFile);
  }

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
      // Crear fullname automático y asociar email
      data.user = {
        userName: `${data.nombre} ${data.apellido}`,
        email: data.email,
      };

      const response = await addDocente(data, session.user.token);
      if (response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Datos duplicados",
          text: "Ya existe un docente con ese correo u numero de telefono.",
        });
        return;
      }
      Swal.fire({
        icon: "success",
        title: "Docente agregado",
        text: "El docente se ha agregado correctamente.",
      }).then(() => {
        router.push("/dashboard/admin/docentes");
        router.refresh();
      });
    } catch (error: any) {
      const message = error?.response?.data?.message;

      if (message?.includes("email")) {
        setError("email", {
          type: "manual",
          message: "Ya existe un docente con este email.",
        });
      }

      if (message?.includes("telefono")) {
        setError("telefono", {
          type: "manual",
          message: "Ya existe un docente con este telefono.",
        });
      }

      if (!message?.includes("email") && !message?.includes("telefono")) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al agregar el docente.",
        });
      }
      if (error?.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Datos duplicados",
          text: "Ya existe un docente con ese correo o email. Por favor, verifica los datos ingresados.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al agregar el docente.",
        });
      }
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
          <Label>Edad</Label>
          <Input type="number" {...register("edad", { valueAsNumber: true })} />
        </div>
        <div>
          <Label>Dirección</Label>
          <Input {...register("direccion")} />
        </div>
        <div>
          <Label>Teléfono</Label>
          <Input {...register("telefono")} />
          {errors.telefono && (
            <p className="text-sm text-red-500">{errors.telefono.message}</p>
          )}
        </div>
        <div>
          <Label>Email</Label>
          <Input {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label>Fecha Ingreso</Label>
          <Input {...register("fecha_ingreso")} type="date" />
        </div>
        <div>
          <Label>Fecha Nacimiento</Label>
          <Input {...register("fecha_nacimiento")} type="date" />
        </div>
        <Label>Imagen</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
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

// export function DocenteEditForm() {
//   const { id } = useParams();
//   const router = useRouter();
//   const [file, setFile] = useState<File | null>(null);
//   const { data: session } = useSession();
//   const { register, handleSubmit, setValue } = useForm<DocenteData>({});

//   useEffect(() => {
//     getDocenteById(Number(id)).then((data) => {
//       console.log("Datos del docente:", data);
//       setValue("nombre", data.nombre);
//       setValue("apellido", data.apellido);
//       setValue("edad", data.edad);
//       setValue("codigo_laboral", data.codigo_laboral);
//       setValue("direccion", data.direccion);
//       setValue("telefono", data.telefono);
//       setValue("email", data.email);
//       setValue("fecha_ingreso", data.fecha_ingreso);
//       setValue("fecha_nacimiento", data.fecha_nacimiento);
//     });
//   }, [id, setValue]);

//   const onSubmit = handleSubmit(async (data) => {
//     await updateDocente(data, Number(id), session?.user?.token);
//     router.push("/dashboard/admin/docentes/");
//     router.refresh();
//   });

//   return (
//     <form onSubmit={onSubmit} className="space-y-4 p-4 max-w-4xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label>Nombre</Label>
//           <Input {...register("nombre")} />
//         </div>
//         <div>
//           <Label>Apellido</Label>
//           <Input {...register("apellido")} />
//         </div>
//         <div>
//           <Label>Edad</Label>
//           <Input type="number" {...register("edad", { valueAsNumber: true })} />
//         </div>
//         {/* <div className="md:col-span-2">
//           <Label>Cursos Asignados</Label>
//           <Input {...register("cursos_asignados")} />
//         </div> */}
//         <div>
//           <Label>Dirección</Label>
//           <Input {...register("direccion")} />
//         </div>
//         <div>
//           <Label>Teléfono</Label>
//           <Input {...register("telefono")} />
//         </div>
//         <div>
//           <Label>Email</Label>
//           <Input {...register("email")} />
//         </div>
//         <div>
//           <Label>Fecha Ingreso</Label>
//           <Input {...register("fecha_ingreso")} type="date" />
//         </div>
//         <div>
//           <Label>Fecha Nacimiento</Label>
//           <Input {...register("fecha_nacimiento")} type="date" />
//         </div>
//       </div>

//       <div className="pt-4">
//         <Button className={buttonVariants({ variant: "agregar" })}>
//           Actualizar Docente
//         </Button>
//       </div>
//     </form>
//   );
// }
