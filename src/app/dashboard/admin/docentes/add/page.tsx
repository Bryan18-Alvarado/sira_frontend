import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocenteForm } from "@/components/docentes/docente-form";
function DocentesAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Docente</CardTitle>
        </CardHeader>
        <CardContent>
          <DocenteForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default DocentesAddPage;
