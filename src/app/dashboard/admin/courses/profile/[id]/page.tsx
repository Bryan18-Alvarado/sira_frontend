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
        setCourse(data.data);
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
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {course.image && (
          <img
            src={`http://localhost:4000${course.image}`}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-indigo-600">
            {course.nombre}
          </h1>
          <button
            onClick={() =>
              (window.location.href = `/dashboard/admin/courses/${course.id}/edit-image`)
            }
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Actualizar Imagen
          </button>
        </div>

        <p className="text-gray-600 mb-4">{course.descripcion}</p>
        <p className="text-sm text-gray-500">
          <strong>Category:</strong> {course.categories?.nombre || "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Level:</strong> {course.level?.level_course || "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Instructor:</strong> {course.docentes?.nombre || "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Duration:</strong> {course.duracion || "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Start Date:</strong>{" "}
          {course.fecha_inicio
            ? new Date(course.fecha_inicio).toLocaleDateString()
            : "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          <strong>End Date:</strong>{" "}
          {course.fecha_fin
            ? new Date(course.fecha_fin).toLocaleDateString()
            : "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Price:</strong> ${course.precio ?? "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Available Slots:</strong> {course.cupos_disponibles ?? "N/A"}
        </p>
      </div>
    </div>
  );
};

export default CourseProfile;
