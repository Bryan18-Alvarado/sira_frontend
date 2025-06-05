import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentEditForm } from "../../../../components/students/student-form";

function CarsAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Editar Estudiante</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentEditForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CarsAddPage;
