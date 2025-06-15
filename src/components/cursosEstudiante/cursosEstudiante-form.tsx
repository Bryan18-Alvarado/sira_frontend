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
  console.log(session);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchStudentAndCourses(Number(session.user.id));
    }
  }, [session]);

  const fetchStudentAndCourses = async (userId: number) => {
    try {
      const student = await getStudentByUserId(userId);
      const data = await getCoursesByStudentId(student.id);
      setCourses(data);
    } catch (error) {
      console.error("Error al cargar los cursos", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mis Cursos</h1>
      {courses.length === 0 ? (
        <p>No estás inscrito en ningún curso.</p>
      ) : (
        <CursosEstudiantesCards courses={courses} />
      )}
    </div>
  );
}
