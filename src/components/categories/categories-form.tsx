"use client";
import { useForm } from "react-hook-form";
import { CategoriesData } from "../../interface/categories.interface";
import { useParams, useRouter } from "next/navigation";
import { addCategory, updateCategory } from "../../app/api/categories.api";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";

export const metadata = {
  title: "Agregar Categoria",
  description: "Agregar una nueva categoria al sistema",
};

export function CategoriesForm() {
  const { register, handleSubmit, setValue } = useForm<CategoriesData>();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    await addCategory(data);
    router.push("/dashboard/admin/categories");
    router.refresh();
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
        </div>
        <div>
          <Label htmlFor="descripcion">Descripción</Label>
          <Input
            id="descripcion"
            {...register("descripcion", {
              required: "La descripción es requerida",
            })}
          />
        </div>
      </div>
      <Button type="submit" className={buttonVariants({ variant: "agregar" })}>
        Agregar Categoria
      </Button>
    </form>
  );
}

// export function CategoriesEditForm() {
//   const { id } = useParams();
//   const router = useRouter();

//   const { register, handleSubmit, setValue } = useForm<CategoriesData>();

//   const onSubmit = handleSubmit(async (data) => {
//     await updateCategory(data, Number(id));
//     router.push("/dashboard/categories");
//     router.refresh();
//   });

//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       <div className="grid gap-4">
//         <div>
//           <Label htmlFor="nombre">Nombre</Label>
//           <Input
//             id="nombre"
//             {...register("nombre", { required: "El nombre es requerido" })}
//           />
//         </div>
//         <div>
//           <Label htmlFor="descripcion">Descripción</Label>
//           <Input
//             id="descripcion"
//             {...register("descripcion", {
//               required: "La descripción es requerida",
//             })}
//           />
//         </div>
//       </div>
//       <Button type="submit" className={buttonVariants({ variant: "agregar" })}>
//         Actualizar Categoria
//       </Button>
//     </form>
//   );
// }
