import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LevelTable } from "../../../../components/levels/level-table";

function LevelsTablePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Tabla de niveles</CardTitle>
        </CardHeader>
        <CardContent>
          <LevelTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default LevelsTablePage;
