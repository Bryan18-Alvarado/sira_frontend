"use client";
import React, { useEffect, useState } from "react";
import {
  Course,
  CoursesResponse,
} from "../../../../../interface/courses.interface";

const CoursesActivos = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/courses");
        if (!response.ok) {
          throw new Error("Error al obtener los cursos activos");
        }
        const data: CoursesResponse = await response.json();
        setCourses(data.data || []);
      } catch (error) {
        console.error("Error al obtener los cursos activos:", error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Cursos Activos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 hover:scale-105 hover:bg-green-200"
          >
            <img
              src={course.image ?? "/images/default.png"}
              alt={`${course.nombre}}`}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500"
            />
            <h2 className="text-lg font-semibold text-center text-gray-800">
              {`${course.nombre} ${course.docentes?.nombre}`}
            </h2>
            <p className="text-center text-sm text-gray-600">
              {course.horario}
            </p>
            <div className="mt-4 flex justify-center">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-yellow-600 transition">
                Ver Cursos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesActivos;
