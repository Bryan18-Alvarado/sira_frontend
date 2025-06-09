import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoursesForm } from "../../../../../components/courses/courses-form";
function CoursesAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Curso</CardTitle>
        </CardHeader>
        <CardContent>
          <CoursesForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CoursesAddPage;
