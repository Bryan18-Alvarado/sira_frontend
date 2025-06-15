// src/components/students/CursosEstudiantesCards.tsx
import React from "react";
import { StudentCourse } from "../../interface/estudiante.interface";

interface Props {
  courses: StudentCourse[];
}

export default function CursosEstudiantesCards({ courses }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="border p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-bold mb-2">{course.courses.nombre}</h2>
          <p className="text-sm text-gray-500">
            Inscrito el: {new Date(course.enrollmentDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
