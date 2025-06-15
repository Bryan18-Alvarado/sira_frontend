"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  getCoursesByStudentId,
  getStudentByUserId,
} from "../../app/api/estudent.api";
import CursosEstudiantesCards from "./cursosEstudiantesCards";

export default function StudentCoursesPage() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);
  const [studentName, setStudentName] = useState(""); // Estado para el nombre del estudiante
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchStudentAndCourses(Number(session.user.id));
    }
  }, [session]);

  const fetchStudentAndCourses = async (userId: number) => {
    try {
      const student = await getStudentByUserId(userId);
      setStudentName(student.nombre); // Guardar el nombre del estudiante
      const data = await getCoursesByStudentId(student.id);
      setCourses(data);
    } catch (error) {
      console.error("Error al cargar los cursos", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {loading ? (
        <div className="text-center">
          <p className="text-gray-600 text-lg">Cargando tus cursos...</p>
        </div>
      ) : courses.length === 0 ? (
        <div className="max-w-md text-center p-6 rounded-lg bg-yellow-100 border border-yellow-300 shadow-md">
          <div className="flex flex-col items-center mb-4">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-16 w-16 rounded-full border border-white shadow-md mb-2"
            />
            <h1 className="text-2xl font-bold text-yellow-800">
              Community English Center
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            No estás inscrito en ningún curso
          </h2>
          <p className="text-yellow-700 mb-4">
            Estimad@ {studentName}, actualmente no tienes cursos en proceso.
            ¡Explora nuestra oferta académica y encuentra el curso perfecto para
            ti!
          </p>
          <button
            onClick={() => (window.location.href = "/catalogo-cursos")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition-colors"
          >
            Revisar oferta académica
          </button>
        </div>
      ) : (
        <CursosEstudiantesCards courses={courses} />
      )}
    </div>
  );
}
