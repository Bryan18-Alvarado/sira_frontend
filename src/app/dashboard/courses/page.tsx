import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CoursesTable } from "../../../components/courses/courses-table";

function CoursesTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Cursos</CardTitle>
        </CardHeader>
        <CardContent>
          <CoursesTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default CoursesTablePage;
