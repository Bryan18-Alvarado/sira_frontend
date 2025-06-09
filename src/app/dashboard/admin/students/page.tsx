import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StudentTable from "../../../../components/students/student-table";

function StudentTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Estudiantes</CardTitle>
        </CardHeader>
        <CardContent>
          <StudentTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentTablePage;
