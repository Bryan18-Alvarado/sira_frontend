"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IoAnalyticsSharp,
  IoBookSharp,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoNewspaperSharp,
  IoPeopleSharp,
  IoPersonAddSharp,
  IoPersonSharp,
} from "react-icons/io5";

import { SidebarItem } from "./SidebarItem";
import { CiLogout } from "react-icons/ci";
import { signOutAndRedirect } from "../app/signOut/page";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const menuByRole = {
  admin: [
    {
      icon: <IoCalendarOutline />,
      title: "Dashboard",
      path: "/dashboard/admin",
    },
    {
      icon: <IoPersonSharp />,
      title: "Docentes",
      path: "/dashboard/admin/docentes",
    },
    {
      icon: <IoPeopleSharp />,
      title: "Estudiantes",
      path: "/dashboard/admin/students",
    },
    {
      icon: <IoPersonAddSharp />,
      title: "Tutores",
      path: "/dashboard/admin/tutores",
    },
    {
      icon: <IoNewspaperSharp />,
      title: "Categorias",
      path: "/dashboard/admin/categories",
    },
    {
      icon: <IoBookSharp />,
      title: "Cursos",
      path: "/dashboard/admin/courses",
    },
    {
      icon: <IoAnalyticsSharp />,
      title: "Nivel de Cursos",
      path: "/dashboard/admin/levels",
    },
  ],
  docente: [
    {
      icon: <IoCalendarOutline />,
      title: "Inicio",
      path: "/dashboard/docente",
    },
    {
      icon: <IoCheckboxOutline />,
      title: "Mis Cursos",
      path: "/dashboard/docente/cursos",
    },
    {
      icon: <IoCheckboxOutline />,
      title: "Cursos Activos",
      path: "/dashboard/docente/cursos-activos",
    },
    {
      icon: <IoListOutline />,
      title: "Calificaciones",
      path: "/dashboard/docente/calificaciones",
    },
  ],
  estudiante: [
    {
      icon: <IoCalendarOutline />,
      title: "Inicio",
      path: "/dashboard/estudiante",
    },
    {
      icon: <IoBookSharp />,
      title: "Mis Cursos",
      path: "/dashboard/estudiante/cursos",
    },
    {
      icon: <IoCheckboxOutline />,
      title: "Calificaciones",
      path: "/dashboard/estudiante/calificaciones",
    },
  ],
};

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (status === "loading") {
    return <div className="p-4">Cargando menú...</div>;
  }

  const roles = session?.user?.roles ?? [];
  const role = roles.find((r) => r !== "user");

  const menuItems = menuByRole[role as keyof typeof menuByRole] ?? [];

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-20 p-2 bg-gray-800 text-white rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-10 top-0 left-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] md:translate-x-0`}
      >
        <div>
          <div className="-mx-6 px-6 py-4">
            <Link href="/" title="home">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={50}
                height={50}
                className="rounded-full"
              />
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Image
              src="/images/beethoven.jpg"
              width={150}
              height={150}
              alt="Profile"
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              {session?.user?.userName ?? "Usuario"}
            </h5>
            <span className="hidden text-gray-400 lg:block">
              {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Sin rol"}
            </span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {menuItems.map((item) => (
              <SidebarItem key={item.path} {...item} />
            ))}
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <button
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group transition-all duration-300 hover:bg-red-100 hover:text-red-600"
            onClick={signOutAndRedirect}
          >
            <CiLogout className="text-xl group-hover:scale-110 group-hover:text-red-600 transition-transform duration-300" />
            <span className="group-hover:text-red-600 transition-colors duration-300">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};
