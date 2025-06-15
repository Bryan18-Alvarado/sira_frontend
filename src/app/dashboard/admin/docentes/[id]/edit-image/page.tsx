import { UpdateDocenteImageForm } from "../../../../../../components/docentes/docente-editformimage";

export default function EditCourseImagePage({
  params,
}: {
  params: { id: string };
}) {
  const docenteId = parseInt(params.id, 10);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Actualizar Imagen del Docente</h1>
      <UpdateDocenteImageForm docenteId={docenteId} />
    </div>
  );
}
