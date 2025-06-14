"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCoursesByStudentId } from "../../app/api/estudent.api";

export default function StudentCoursesPage() {
  const { data: session } = useSession();
  console.log(session);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchCourses(Number(session.user.id));
    }
  }, [session]);

  const fetchCourses = async (studentId: number) => {
    try {
      const data = await getCoursesByStudentId(studentId);
      setCourses(data);
    } catch (error) {
      console.error("Error al cargar los cursos", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando cursos...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mis Cursos</h1>
      {courses.length === 0 ? (
        <p>No estás inscrito en ningún curso.</p>
      ) : (
        <ul className="space-y-4">
          {courses.map((course: any) => (
            <li key={course.studentcoursesId} className="p-4 border rounded">
              <h2 className="text-xl font-semibold">{course.courses.name}</h2>
              <p>
                Fecha de inscripción:{" "}
                {new Date(course.enrollmentDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import CursosEstudiantesCards from "./cursosEstudiantesCards";

// export default function CursosEstudiantesForm() {
//   const [studentId, setStudentId] = useState("");
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   interface Course {
//     studentcoursesId: number;
//     courses?: {
//       name: string;
//       description?: string;
//     };
//   }

//   async function fetchCoursesById(id: number) {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(
//         `http://localhost:4000/api/v1/studentcourses/student/${id}`
//       );

//       if (!res.ok) throw new Error("Error al cargar los cursos");

//       const data: Course[] = await res.json();
//       setCourses(data);
//     } catch (err) {
//       setError((err as Error).message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!studentId) return;
//     fetchCoursesById(Number(studentId));
//   };

//   return (
//     <div className="p-4">
//       <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
//         <input
//           type="number"
//           placeholder="Ingrese ID del estudiante"
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value)}
//           className="input input-bordered"
//         />
//         <button type="submit" className="btn btn-primary">
//           Buscar
//         </button>
//       </form>

//       {loading && <p>Cargando cursos...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <CursosEstudiantesCards courses={courses} />
//     </div>
//   );
// }
