import React, { useEffect, useState } from "react";
import {
  Course,
  CoursesResponse,
} from "../../../../../interface/courses.interface";

const ActiveCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/courses");
        if (!response.ok) {
          throw new Error("Error al obtener los estudiantes activos");
        }
        const data: CoursesResponse = await response.json();
        setCourses(data.data || []);
      } catch (error) {
        console.error("Error al obtener los estudiantes activos:", error);
        setCourses([]);
      }
    };

    fetchCourse();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Active Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{course.nombre}</h2>
            <p className="text-gray-600 mb-2">{course.descripcion}</p>
            <p className="text-sm text-gray-500">
              <strong>Category:</strong> {course.categories.nombre}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Level:</strong> {course.level.level_course}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Instructor:</strong> {course.docentes.nombre}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Duration:</strong> {course.duracion}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Start Date:</strong>{" "}
              {new Date(course.fecha_inicio).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              <strong>End Date:</strong>{" "}
              {new Date(course.fecha_fin).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Price:</strong> ${course.precio}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Available Slots:</strong> {course.cupos_disponibles}
            </p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCoursesPage;
