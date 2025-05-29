import React from "react";
import { DocenteForm } from "@/components/docentes/docente-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DocentesAddPage() {
  <div className="h-screen flex justify-center items-center">
    <Card>
      <CardHeader>
        <CardTitle>Agregar Nueva Docente</CardTitle>
      </CardHeader>
      <CardContent>
        <DocenteForm />
      </CardContent>
    </Card>
  </div>;
}

export default DocentesAddPage;
