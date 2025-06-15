"use client";

import React, { useEffect, useState } from "react";
import {
  Course,
  CoursesResponse,
} from "../../../../../interface/courses.interface";
import { FileText } from "lucide-react"; // Cambiado el ícono

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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Cursos del Community English Center
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {course.nombre}
              </h2>
              <p className="text-gray-600 mb-4">{course.descripcion}</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  <strong>Category:</strong>{" "}
                  {course.categories?.nombre || "N/A"}
                </p>
                <p>
                  <strong>Level:</strong> {course.level?.level_course || "N/A"}
                </p>
                <p>
                  <strong>Instructor:</strong>{" "}
                  {course.docentes?.nombre || "N/A"}
                </p>
                <p>
                  <strong>Duration:</strong> {course.duracion}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(course.fecha_inicio).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(course.fecha_fin).toLocaleDateString()}
                </p>
                <p>
                  <strong>Price:</strong> ${course.precio}
                </p>
                <p>
                  <strong>Available Slots:</strong> {course.cupos_disponibles}
                </p>
              </div>
              <div className="mt-4 flex justify-center">
                <a
                  href={`/dashboard/admin/courses/profile/${course.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-900 flex items-center"
                >
                  <FileText className="mr-2 h-4 w-4" /> {/* Nuevo ícono */}
                  Ver plan de estudio
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCoursesPage;
