import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DocenteTable from "../../../components/docentes/docentes-table";

function DocentesTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de docentes</CardTitle>
        </CardHeader>
        <CardContent>
          <DocenteTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default DocentesTablePage;
