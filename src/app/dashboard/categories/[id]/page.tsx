import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoriesEditForm } from "../../../../components/categories/categories-form";
function CategoriesEditPage() {
  return (
    <div className="h-screen flex justify-center items-center shadow-sm">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Editar categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesEditForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoriesEditPage;
