"use client";
import { useSession } from "next-auth/react";

export default function DocentePage() {
  const { data: session } = useSession();

  const roles = session?.user?.roles ?? [];

  if (!roles.includes("estudiante")) {
    return <div>Acceso denegado</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Bienvenido Estudiante</h1>
    </main>
  );
}
