import { UpdateDocenteImageFormDocente } from "../../../../../components/docentes/docente-editformimage";

export default function EditDocenteImagePage({
  params,
}: {
  params: { id: string };
}) {
  const docenteId = parseInt(params.id, 10);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Actualizar Imagen</h1>
      <UpdateDocenteImageFormDocente docenteId={docenteId} />
    </div>
  );
}
