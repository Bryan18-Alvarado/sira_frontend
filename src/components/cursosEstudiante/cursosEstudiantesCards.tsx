import { FC } from "react";

interface Course {
  studentcoursesId: number;
  courses?: {
    nombre: string;
    descripcion?: string;
  };
}

interface Props {
  courses: Course[];
}

const CursosEstudiantesCards: FC<Props> = ({ courses }) => {
  if (courses.length === 0) return <p>No hay cursos para mostrar.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {courses.map(({ studentcoursesId, courses }) => (
        <div
          key={studentcoursesId}
          className="border shadow hover:shadow-lg transition p-4 rounded-md"
        >
          <h3 className="text-lg font-semibold mb-2">
            {courses?.nombre || "Curso sin nombre"}
          </h3>
          <p className="text-sm text-gray-600">
            {courses?.descripcion || "Descripción no disponible"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CursosEstudiantesCards;
