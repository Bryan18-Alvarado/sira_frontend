// "use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex justify-between">
      <h1 className="text-4xl font-bold">SIRA</h1>
      <Link href="/docentes/add" className={buttonVariants()}>
        Nuevo docente
      </Link>
    </div>
  );
}
