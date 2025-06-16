"use client";

import { useEffect, useState } from "react";
import { getCoursesByDocenteId } from "../../../../api/docentes.api";

export default function CursosDocentePage({
  params,
}: {
  params: { id: string };
}) {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCoursesByDocenteId(Number(params.id));
        setCourses(data.data || []);
      } catch (error) {
        console.error("Error al cargar los cursos del docente", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchCourses();
  }, [params.id]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-8">
        Cursos asignados al docente
      </h1>
      {loading ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg">Cargando cursos...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="max-w-md text-center p-6 rounded-lg bg-blue-100 border border-blue-300 shadow-md">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">
            No tienes cursos asignados
          </h2>
          <p className="text-blue-700 mb-4">
            Actualmente no tienes cursos asignados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-transform hover:scale-105 flex flex-col"
            >
              <div className="h-32 bg-gray-100 flex items-center justify-center rounded-t-xl overflow-hidden">
                {course.image ? (
                  <img
                    src={`http://localhost:4000${course.image}`}
                    alt={course.nombre}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-500 text-lg font-semibold">
                    {course.nombre}
                  </span>
                )}
              </div>
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {course.nombre}
                </h2>
                <p className="text-gray-600 mb-2">{course.descripcion}</p>
                <div className="text-sm text-gray-700">
                  <p>
                    <strong>Duración:</strong> {course.duracion}
                  </p>
                  <p>
                    <strong>Inicio:</strong>{" "}
                    {new Date(course.fecha_inicio).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fin:</strong>{" "}
                    {new Date(course.fecha_fin).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Cupos:</strong> {course.cupos_disponibles}
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-center bg-gray-50">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors duration-300 hover:bg-blue-900 font-semibold shadow"
                  onClick={() => {
                    window.location.href = `/dashboard/docente/${params.id}/cursos/${course.id}/calificar`;
                  }}
                >
                  Calificar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
