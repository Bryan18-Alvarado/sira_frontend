"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCourseById } from "../../../../../../../../api/courses.api";
import { getStudentById } from "../../../../../../../../api/estudent.api";

export default function CalificarEstudiantePage({
  params,
}: {
  params: { id: string; courseId: string; studentId: string };
}) {
  const [grade, setGrade] = useState("");
  const [gradeType, setGradeType] = useState("");
  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await getStudentById(Number(params.studentId));
        setStudent(studentData);
        const courseData = await getCourseById(Number(params.courseId));
        setCourse(courseData);
      } catch (error) {
        setStudent(null);
        setCourse(null);
      }
    };
    fetchData();
  }, [params.studentId, params.courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/v1/calificaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: Number(params.studentId),
          courseId: Number(params.courseId),
          grade: Number(grade),
          gradeDate: new Date().toISOString().slice(0, 10),
          gradeType,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar calificación");

      await Swal.fire({
        icon: "success",
        title: "¡Calificación ingresada!",
        text: "La calificación se guardó correctamente.",
        confirmButtonText: "OK",
      });

      window.location.href = `/dashboard/docente/${params.id}/cursos/${params.courseId}/calificar`;
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar la calificación.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        {student && course
          ? `Calificar a ${student.nombre} ${student.apellido} en el curso ${course.nombre}`
          : "Cargando datos..."}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded shadow max-w-md w-full"
      >
        <div>
          <label className="block mb-1 font-semibold">Nota</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Nota"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">
            Tipo de calificación
          </label>
          <input
            type="text"
            value={gradeType}
            onChange={(e) => setGradeType(e.target.value)}
            placeholder="Ej: Examen, Tarea, Participación"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 font-semibold"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Calificar"}
        </button>
      </form>
    </div>
  );
}
