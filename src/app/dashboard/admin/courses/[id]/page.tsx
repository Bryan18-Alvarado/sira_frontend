"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Course } from "../../../../../interface/courses.interface";

const CourseProfile: React.FC = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/courses/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el curso");
        }
        const data = await response.json();
        setCourse(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (!course) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{course.nombre}</h1>
      <p>{course.descripcion}</p>
      {/* Puedes agregar más detalles aquí */}
    </div>
  );
};

export default CourseProfile;
