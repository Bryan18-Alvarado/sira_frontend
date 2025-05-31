import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoriesForm } from "../../../../components/categories/categories-form";
function CategoriesAddPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nueva Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoriesAddPage;
