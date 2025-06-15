"use client";
import React, { useEffect, useState } from "react";
import { Course } from "../../../../interface/courses.interface";
import { getAllCourses } from "../../../api/courses.api";

interface CoursesResponse {
  courses: Course[];
  total: number;
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      const response = await getAllCourses();
      setCourses(response.data || []);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  if (loading) return <div>Cargando cursos...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {courses && courses.length > 0 ? (
        courses.map((course) => (
          <div
            key={course.id}
            className="relative bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col overflow-hidden group"
          >
            <div className="h-40 bg-gray-100 flex items-center justify-center rounded-t-2xl overflow-hidden">
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
            {/* Contenido del curso */}
            <div className="p-6 flex-grow">
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {course.nombre}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {course.descripcion}
              </p>
              <div className="text-sm text-green-900 space-y-1">
                <p>
                  <strong>Categoría:</strong>{" "}
                  {course.categories?.nombre || "N/A"}
                </p>
                <p>
                  <strong>Nivel:</strong> {course.level?.level_course || "N/A"}
                </p>
                <p>
                  <strong>Docente:</strong> {course.docentes?.nombre || "N/A"}
                </p>
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
                  <strong>Precio:</strong> ${course.precio}
                </p>
                <p>
                  <strong>Cupos:</strong> {course.cupos_disponibles}
                </p>
              </div>
            </div>
            {/* Botón alineado */}
          </div>
        ))
      ) : (
        <p>No hay cursos disponibles.</p>
      )}
    </div>
  );
};

export default CoursesPage;
