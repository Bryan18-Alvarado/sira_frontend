"use client";

import { useEffect, useState } from "react";
import { getStudentsByCourseId } from "../../../../../../api/estudent.api";
import { getCourseById } from "../../../../../../api/courses.api";

export default function CalificarCursoPage({
  params,
}: {
  params: { id: string; courseId: string };
}) {
  const [students, setStudents] = useState<any[]>([]);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getStudentsByCourseId(Number(params.courseId));
        console.log("Estudiantes recibidos:", students); // <-- ¿Ves esto en consola?
        setStudents(students);
      } catch (error) {
        setStudents([]);
        console.error("Error al cargar estudiantes", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.courseId) fetchStudents();
  }, [params.courseId]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseById(Number(params.courseId));
        setCourse(courseData);
      } catch (error) {
        setCourse(null);
      }
    };
    fetchCourse();
  }, [params.courseId]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        Estudiantes del curso {course ? `(${course.nombre})` : "(Cargando...)"}
      </h1>
      {loading ? (
        <p>Cargando estudiantes...</p>
      ) : students.length === 0 ? (
        <p>No hay estudiantes inscritos en este curso.</p>
      ) : (
        <ul className="w-full max-w-xl bg-white rounded shadow p-4">
          {students.map((student) => (
            <li
              key={student.id}
              className="flex items-center border-b last:border-b-0 py-2 gap-4"
            >
              <img
                src={`http://localhost:4000${student.image}`}
                alt={student.nombre}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <div className="flex-1">
                <span className="font-semibold">
                  {student.nombre} {student.apellido}
                </span>
                <div className="text-sm text-gray-500">{student.email}</div>
              </div>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-800"
                onClick={() =>
                  (window.location.href = `/dashboard/docente/${params.id}/cursos/${params.courseId}/estudiante/${student.id}/calificar`)
                }
              >
                Calificar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
