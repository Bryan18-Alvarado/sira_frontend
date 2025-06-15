export default function EditPasswordPage({
  params,
}: {
  params: { id: string };
}) {
  const estudianteId = parseInt(params.id, 10);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Actualizar Contraseña del Estudiante
      </h1>
    </div>
  );
}
