"use client";

import React, { useEffect, useState } from "react";
import { PiBooksBold, PiUsersBold } from "react-icons/pi";

export const WidgetItem = () => {
  const [totalCourses, setTotalCourses] = useState<number | null>(null);
  const [totalActiveStudents, setTotalActiveStudents] = useState<number | null>(
    null
  );

  const fetchTotalCourses = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/v1/courses?limit=1");
      const json = await res.json();
      setTotalCourses(json.total);
    } catch (error) {
      console.error("Error cargando total de cursos:", error);
    }
  };

  const fetchTotalActiveStudents = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/v1/students/active?limit=1"
      );
      const json = await res.json();
      setTotalActiveStudents(json.total);
    } catch (error) {
      console.error("Error cargando total de estudiantes activos:", error);
    }
  };

  useEffect(() => {
    fetchTotalCourses();
    fetchTotalActiveStudents();
  }, []);

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full px-4">
      {/* Card Total Cursos */}
      <div className="w-full h-full py-10 px-8 space-y-6 rounded-xl bg-blue-600 shadow-lg text-white flex flex-col items-center">
        <div className="flex items-center gap-4">
          <PiBooksBold size={48} />
          <h5 className="text-2xl font-semibold">Total Cursos</h5>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <h3 className="text-5xl font-extrabold">
            {totalCourses !== null ? totalCourses : "Cargando..."}
          </h3>
        </div>
        <span className="text-center text-blue-200 text-lg">
          Cursos registrados en el sistema
        </span>
      </div>

      {/* Card Total Estudiantes Activos */}
      <div className="w-full h-full py-10 px-8 space-y-6 rounded-xl bg-blue-600 shadow-lg text-white flex flex-col items-center">
        <div className="flex items-center gap-4">
          <PiUsersBold size={48} />
          <h5 className="text-2xl font-semibold">Estudiantes Activos</h5>
        </div>
        <div className="mt-4 flex items-center gap-6">
          <h3 className="text-5xl font-extrabold">
            {totalActiveStudents !== null ? totalActiveStudents : "Cargando..."}
          </h3>
        </div>
        <span className="text-center text-blue-200 text-lg">
          Estudiantes activos en el sistema
        </span>
      </div>
    </div>
  );
};
