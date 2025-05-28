import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex justify-between">
      <h1 className="text-4xl font-bold">SIRA</h1>
      <Link href="docentes/add" className={buttonVariants()}>
        Nuevo docente
      </Link>
    </div>
  );
};

export default HomePage;
