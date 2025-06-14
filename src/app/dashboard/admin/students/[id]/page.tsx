import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentEditForm } from "../../../../../components/students/student-formedit";
function EstudianteEditPage() {
  return (
    <div className="h-screen flex justify-center items-center shadow-sm">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Editar Estuddiante</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentEditForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default EstudianteEditPage;
