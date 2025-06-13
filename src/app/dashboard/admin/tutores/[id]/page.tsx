import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TutorEditForm } from "../../../../../components/tutores/tutores-formedit";

function TutorEditPage() {
  return (
    <div className="h-screen flex justify-center items-center shadow-sm">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Editar Tutor</CardTitle>
        </CardHeader>
        <CardContent>
          <TutorEditForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default TutorEditPage;
