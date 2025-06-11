"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Bell,
  Layers,
  BookOpen,
  UserCheck,
} from "lucide-react";

export default function DocentePage() {
  const { data: session } = useSession();
  const roles = session?.user?.roles ?? [];

  if (!roles.includes("admin")) {
    return (
      <div className="p-6 text-red-600 font-semibold">Acceso denegado</div>
    );
  }

  return (
    <main>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Bienvenido Administrador
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link href="/dashboard/admin/docentes/active">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-4">
              <Users className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-xl font-semibold">Docentes Activos</h2>
                <p className="text-sm opacity-90">
                  Ver lista de docentes activos
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/estudiantes/activos">
          <div className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-4">
              <GraduationCap className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-xl font-semibold">Estudiantes Activos</h2>
                <p className="text-sm opacity-90">
                  Ver lista de estudiantes activos
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/admin/courses/active">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-4">
              <Layers className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-xl font-semibold">Cursos</h2>
                <p className="text-sm opacity-90">Ver y Administrar cursos</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/categorias">
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-xl font-semibold">Categorías</h2>
                <p className="text-sm opacity-90">
                  Administrar categorías de contenido
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/notificaciones">
          <div className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-4">
              <Bell className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-xl font-semibold">Notificaciones</h2>
                <p className="text-sm opacity-90">
                  Administrar notificaciones del sistema
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/tutores">
          <div className="bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-105 cursor-pointer">
            <div className="flex items-center gap-4">
              <UserCheck className="w-10 h-10 text-white" />
              <div>
                <h2 className="text-xl font-semibold">Tutores</h2>
                <p className="text-sm opacity-90">Ver y administrar tutores</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
