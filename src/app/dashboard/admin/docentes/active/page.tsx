"use client";
import React, { useEffect, useState } from "react";
import {
  Docente,
  DocenteResponse,
} from "../../../../../interface/docente.interface";
import { buttonVariants } from "../../../../../components/ui/button";
import { Link } from "lucide-react";
import { PiPlusCircleBold } from "react-icons/pi";

const DocentesActivos = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/docentes");
        if (!response.ok) {
          throw new Error("Error al obtener los docentes activos");
        }
        const data: DocenteResponse = await response.json();
        setDocentes(data.data || []);
      } catch (error) {
        console.error("Error al obtener los docentes activos:", error);
        setDocentes([]);
      }
    };

    fetchDocentes();
  }, []);

  return (
    <div className="p-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Docentes Activos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {docentes.map((docente) => (
            <div
              key={docente.id}
              className="bg-white p-6 rounded-lg shadow-lg transition transform hover:-translate-y-1 hover:scale-105 hover:bg-blue-100 hover:border-4 hover:border-blue-500"
            >
              <img
                src={`http://localhost:4000${docente.image}`}
                alt={`${docente.nombre} ${docente.apellido}`}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-500"
              />
              <h2 className="text-lg font-semibold text-center text-gray-800">
                {`${docente.nombre} ${docente.apellido}`}
              </h2>
              <p className="text-center text-sm text-gray-600">
                {docente.telefono}
              </p>
              <p className="text-center text-sm text-gray-600">
                {docente.email}
              </p>
              <div className="mt-4 flex justify-center">
                <a
                  href={`/dashboard/admin/docentes/profile/${docente.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg transition-colors duration-300 hover:bg-blue-900 flex items-center"
                >
                  <Link className="mr-2 h-4 w-4" />
                  Ver perfil
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocentesActivos;
