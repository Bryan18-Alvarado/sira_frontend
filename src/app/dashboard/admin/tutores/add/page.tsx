import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TutorForm } from "../../../../../components/tutores/tutores-form";

function TutoresAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Tutor</CardTitle>
        </CardHeader>
        <CardContent>
          <TutorForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default TutoresAddPage;
