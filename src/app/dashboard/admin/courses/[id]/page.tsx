import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseEditForm } from "../../../../../components/courses/courses-formedit";
function CursosEditPage() {
  return (
    <div className="h-screen flex justify-center items-center shadow-sm">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Editar Curso</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseEditForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CursosEditPage;
