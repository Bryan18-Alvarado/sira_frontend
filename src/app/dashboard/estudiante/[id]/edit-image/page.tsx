import { UpdateEstudianteImage } from "../../../../../components/students/student-editformimage";

export default function EditCourseImagePage({
  params,
}: {
  params: { id: string };
}) {
  const estudianteId = parseInt(params.id, 10);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Actualizar Imagen del Estudiante
      </h1>
      <UpdateEstudianteImage estudianteId={estudianteId} />
    </div>
  );
}
