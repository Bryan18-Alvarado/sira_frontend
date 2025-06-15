import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LevelEditForm } from "../../../../../components/levels/level-formedit";
function LevelEditPage() {
  return (
    <div className="h-screen flex justify-center items-center shadow-sm">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Editar Niveles</CardTitle>
        </CardHeader>
        <CardContent>
          <LevelEditForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default LevelEditPage;
