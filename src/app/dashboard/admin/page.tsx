"use client";
import { useSession } from "next-auth/react";

export default function DocentePage() {
  const { data: session } = useSession();

  const roles = session?.user?.roles ?? [];

  if (!roles.includes("admin")) {
    return <div>Acceso denegado</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Bienvenido Administrador</h1>
    </main>
  );
}
