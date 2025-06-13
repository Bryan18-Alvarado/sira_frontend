import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TutorTable from "../../../../components/tutores/tutores-table";

function TutoresTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de tutores</CardTitle>
        </CardHeader>
        <CardContent>
          <TutorTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default TutoresTablePage;
