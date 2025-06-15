// app/dashboard/admin/courses/[id]/edit-image/page.tsx

import { UpdateCourseImageForm } from "../../../../../../components/courses/courses-editformimage";

export default function EditCourseImagePage({
  params,
}: {
  params: { id: string };
}) {
  const courseId = parseInt(params.id, 10);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Actualizar Imagen del Curso</h1>
      <UpdateCourseImageForm courseId={courseId} />
    </div>
  );
}
