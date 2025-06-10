"use client";

import CursosEstudiantesForm from "../../../../components/cursosEstudiante/cursosEstudiante-form";

export default function DashboardEstudiantePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cursos Matriculados</h1>

      {/* Formulario para buscar cursos */}
      <CursosEstudiantesForm />
    </div>
  );
}
