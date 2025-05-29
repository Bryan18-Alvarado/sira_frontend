import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocenteForm } from "@/components/docentes/docente-form";

function DocentesTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de Marcas</CardTitle>
        </CardHeader>
        <CardContent>{/* <DocenteForm /> */}</CardContent>
      </Card>
    </div>
  );
}

export default DocentesTablePage;
