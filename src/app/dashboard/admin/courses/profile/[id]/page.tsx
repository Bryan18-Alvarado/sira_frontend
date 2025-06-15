"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Course } from "../../../../../../interface/courses.interface";

const CourseProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/courses/${id}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching course with id ${id}`);
        }
        const data = await response.json();
        console.log("Course data:", data); // Depuración
        setCourse(data.data); // Asegúrate de acceder al campo correcto
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseById();
  }, [id]);
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!course) {
    return <div className="text-center mt-10">Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
        {course.nombre}
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-600 mb-4">{course.descripcion}</p>
        <p className="text-sm text-gray-500">
          <strong>Category:</strong> {course.categories?.nombre}
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
      </div>
    </div>
  );
};

export default CourseProfile;
