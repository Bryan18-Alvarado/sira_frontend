"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   const res = await signIn("credentials", {
  //     redirect: false,
  //     username: email,
  //     password,
  //   });

  //   if (res?.error) {
  //     setError("Credenciales inválidas.");
  //   } else {
  //     router.push("/dashboard");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username: email,
      password,
    });

    if (res?.error) {
      setError("Credenciales inválidas.");
    } else {
      // Login exitoso, ahora obtener la sesión para saber roles
      const session = await getSession();

      if (!session) {
        setError("Error al obtener sesión.");
        return;
      }

      const roles = session.user?.roles ?? [];

      if (roles.includes("admin")) {
        router.push("/dashboard/admin/"); // o la ruta que uses para admin
      } else if (roles.includes("docente")) {
        router.push("/dashboard/docente");
      } else if (roles.includes("estudiante")) {
        router.push("/dashboard/estudiante");
      } else {
        // Si no tiene rol, mandamos a no autorizado o login
        router.push("/no-autorizado");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Iniciar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full">
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
