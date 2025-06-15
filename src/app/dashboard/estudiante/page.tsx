"use client";
import { useSession } from "next-auth/react";
import { FaRegSmileWink } from "react-icons/fa"; // Importar un ícono de festejo

export default function DocentePage() {
  const { data: session } = useSession();

  const roles = session?.user?.roles ?? [];
  const studentName = session?.user?.userName ?? "Estudiante"; // Obtener el nombre del estudiante

  if (!roles.includes("estudiante")) {
    return <div>Acceso denegado</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-yellow-600  flex items-center gap-2">
        Hola Bienvenid@ {studentName}!{" "}
        <FaRegSmileWink className="text-yellow-500" />
      </h1>
    </main>
  );
}
