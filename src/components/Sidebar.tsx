import Image from "next/image";
import Link from "next/link";
import {
  IoBookSharp,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoNewspaperSharp,
  IoPeopleSharp,
  IoPersonSharp,
} from "react-icons/io5";

import { SidebarItem } from "./SidebarItem";
import { CiLogout } from "react-icons/ci";
import { signOutAndRedirect } from "../app/signOut/page";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoPersonSharp />,
    title: "Docentes",
    path: "/dashboard/docentes",
  },
  {
    icon: <IoPeopleSharp />,
    title: "Estudiantes",
    path: "/dashboard/students",
  },
  {
    icon: <IoNewspaperSharp />,
    title: "Categorias",
    path: "/dashboard/categories",
  },
  {
    icon: <IoBookSharp />,
    title: "Cursos",
    path: "/dashboard/courses",
  },
];
export const Sidebar = () => {
  return (
    <aside
      className="fixed z-10 top-0 left-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300
      md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]"
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
            Bryan Alvarado
          </h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
          onClick={signOutAndRedirect}
        >
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};
