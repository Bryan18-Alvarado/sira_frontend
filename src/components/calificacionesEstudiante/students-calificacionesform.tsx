"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Curso } from "../../interface/docente.interface";
import { getStudentByUserId } from "../../app/api/estudent.api";

interface Calificacion {
  gradesId: number;
  grade: number;
  gradeDate: string;
  gradeType: string;
  description: string;
  course: Curso;
}

export default function StudentCalificaciones() {
  const { data: session } = useSession();
  const [studentId, setStudentId] = useState<number | null>(null);
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      getStudentByUserId(Number(session.user.id))
        .then((student) => {
          setStudentId(student.id);
        })
        .catch((error) => {
          console.error("Error al obtener estudiante:", error);
          setLoading(false);
        });
    }
  }, [session]);

  useEffect(() => {
    if (studentId) {
      fetchCalificaciones(studentId);
    }
  }, [studentId]);

  const fetchCalificaciones = async (studentId: number) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/estudiantes/${studentId}/calificacion`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) throw new Error("Error al obtener calificaciones");
      const json = await res.json();
      setCalificaciones(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando calificaciones...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mis Calificaciones</h1>
      {calificaciones.length === 0 ? (
        <p>No hay calificaciones registradas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calificaciones.map((calif) => (
            <div
              key={calif.gradesId}
              className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:border-gray-300 overflow-hidden"
            >
              <div className="relative p-6 bg-gradient-to-br from-green-50 via-gray-50 to-green-100">
                <div className="absolute top-4 right-4">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                      </svg>
                      <span className="text-2xl font-bold text-blue-700 drop-shadow-sm">
                        {calif.grade}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pr-16">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center mb-4 shadow-sm">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5V6a2 2 0 0 0-2-2h-1V2h-2v2H9V2H7v2H6a2 2 0 0 0-2 2v13.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-gray-900 transition-colors">
                    {calif.course.nombre}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z" />
                    </svg>
                    <span>
                      {new Date(calif.gradeDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17l-5-5h10l-5 5z" />
                    </svg>
                    <span>Tipo: {calif.gradeType}</span>
                  </div>
                  {calif.description && (
                    <div className="mt-2 text-xs text-gray-600 italic">
                      Observación: {calif.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
