import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocenteEditForm } from "../../../../components/docentes/docente-form";
function DocenteEditPage() {
  return (
    <div className="h-screen flex justify-center items-center shadow-sm">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Editar Docente</CardTitle>
        </CardHeader>
        <CardContent>
          <DocenteEditForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default DocenteEditPage;
