"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Curso } from "../../interface/docente.interface";
import { getStudentByUserId } from "../../app/api/estudent.api";

interface Calificacion {
  gradesId: number; // id correcto según tu backend
  grade: number;
  gradeDate: string;
  gradeType: string;
  course: Curso;
}

export default function StudentCalificaciones() {
  const { data: session } = useSession();
  const [studentId, setStudentId] = useState<number | null>(null);
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      getStudentByUserId(Number(session.user.id))
        .then((student) => {
          setStudentId(student.id);
        })
        .catch((error) => {
          console.error("Error al obtener estudiante:", error);
          setLoading(false);
        });
    }
  }, [session]);

  useEffect(() => {
    if (studentId) {
      fetchCalificaciones(studentId);
    }
  }, [studentId]);

  const fetchCalificaciones = async (studentId: number) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/estudiantes/${studentId}/calificacion`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) throw new Error("Error al obtener calificaciones");
      const json = await res.json();
      setCalificaciones(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando calificaciones...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mis Calificaciones</h1>
      {calificaciones.length === 0 ? (
        <p>No hay calificaciones registradas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calificaciones.map((calif) => (
            <div
              key={calif.gradesId}
              className="border p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">
                {calif.course.nombre}
              </h2>
              <p className="text-gray-700 text-lg">
                Calificación: {calif.grade}
              </p>
              <p className="text-sm text-gray-500">
                Fecha: {new Date(calif.gradeDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">Tipo: {calif.gradeType}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
