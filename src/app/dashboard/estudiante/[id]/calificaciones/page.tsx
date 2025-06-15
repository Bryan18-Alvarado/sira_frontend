"use client";

import StudentCalificaciones from "../../../../../components/calificacionesEstudiante/students-calificacionesform";

export default function DashboardEstudiantePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cursos Matriculados</h1>

      <StudentCalificaciones />
    </div>
  );
}
