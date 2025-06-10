import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LevelForm } from "../../../../../components/levels/level-form";

function LevelsAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Nivel</CardTitle>
        </CardHeader>
        <CardContent>
          <LevelForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default LevelsAddPage;
