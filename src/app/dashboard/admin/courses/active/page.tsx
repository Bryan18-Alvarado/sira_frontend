"use client";

import React, { useEffect, useState } from "react";
import {
  Course,
  CoursesResponse,
} from "../../../../../interface/courses.interface";
import { FileText } from "lucide-react";

const ActiveCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/courses");
        if (!response.ok) {
          throw new Error("Error fetching courses");
        }
        const data: CoursesResponse = await response.json();
        setCourses(data.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-center mb-6">
        <img
          src="/images/logo.png" // Cambia esta ruta por la de tu logo
          alt="Logo"
          className="h-40 w-auto"
        />
      </div>
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
        Cursos del Community English Center
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col"
          >
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-[6px] group-hover:border-gradient-to-r transition-all duration-500 pointer-events-none"></div>
            <div className="h-40 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden">
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
              <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-500 transition-colors duration-300">
                {course.nombre}
              </h2>
              <p className="text-gray-600 mb-4">{course.descripcion}</p>
              <div className="text-sm text-green-900 space-y-1">
                <p>
                  <strong>Categorias de curso:</strong>{" "}
                  {course.categories?.nombre || "N/A"}
                </p>
                <p>
                  <strong>Niveles:</strong>{" "}
                  {course.level?.level_course || "N/A"}
                </p>
                <p>
                  <strong>Docente:</strong> {course.docentes?.nombre || "N/A"}
                </p>
                <p>
                  <strong>Duracion del curso:</strong> {course.duracion}
                </p>
                <p>
                  <strong>Fecha de inicio:</strong>{" "}
                  {new Date(course.fecha_inicio).toLocaleDateString()}
                </p>
                <p>
                  <strong>Ultimo dia de clase:</strong>{" "}
                  {new Date(course.fecha_fin).toLocaleDateString()}
                </p>
                <p>
                  <strong>Precio mensual:</strong> ${course.precio}
                </p>
                <p>
                  <strong>Cupos disponibles:</strong> {course.cupos_disponibles}
                </p>
              </div>
            </div>
            {/* Botón alineado */}
            <div className="p-4 border-t border-gray-200 flex justify-center">
              <a
                href={`/dashboard/admin/courses/profile/${course.id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-900 flex items-center"
              >
                <FileText className="mr-2 h-4 w-4" />
                Ver plan de estudio
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCoursesPage;
