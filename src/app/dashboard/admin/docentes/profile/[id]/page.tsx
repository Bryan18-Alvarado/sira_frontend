"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Docente,
  DocenteResponse,
} from "../../../../../../interface/docente.interface";
import { Button } from "../../../../../../components/ui/button";

const TeacherProfile = () => {
  const [docente, setDocente] = useState<Docente | null>(null);
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  useEffect(() => {
    const fetchDocente = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/docentes/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el docente");
        }
        const data: DocenteResponse = await response.json();
        setDocente(
          Array.isArray(data.data) ? data.data[0] || null : data.data || null
        );
      } catch (error) {
        console.error("Error al obtener el docente:", error);
        setDocente(null);
      }
    };

    fetchDocente();
  }, [id]);

  if (!docente) {
    return (
      <div className="text-center mt-10 text-green-700">
        Cargando información del docente...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
        <div className="flex flex-col md:flex-row relative">
          <div className="md:w-1/3 bg-blue-300 flex justify-center items-center relative group">
            <img
              src={
                docente.image
                  ? `http://localhost:4000${docente.image}`
                  : "https://via.placeholder.com/150"
              }
              alt={`${docente.nombre} ${docente.apellido}`}
              className="w-56 h-56 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <img
                src={
                  docente.image
                    ? `http://localhost:4000${docente.image}`
                    : "https://via.placeholder.com/150"
                }
                alt={`${docente.nombre} ${docente.apellido}`}
                className="w-96 h-96 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
          <div className="md:w-2/3 p-8 bg-green-100">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              {docente.nombre} {docente.apellido}
            </h2>
            <p className="text-blue-800 mb-6">{docente.user?.email}</p>
            <div className="flex justify-end mb-4">
              <Button
                className="bg-blue-500 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-600 transition"
                onClick={() =>
                  router.push(`/dashboard/admin/docentes/${id}/edit-image`)
                }
              >
                Actualizar Imagen
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Info label="Edad" value={docente.edad} />
              <Info
                label="Género"
                value={docente.genero_id === 1 ? "Masculino" : "Femenino"}
              />
              <Info
                label="Estado Civil"
                value={docente.estado_civil?.marital_status}
              />
              <Info
                label="Teléfono"
                value={docente.telefono || "No disponible"}
              />
              <Info
                label="Fecha de Ingreso"
                value={new Date(docente.fecha_ingreso).toLocaleDateString()}
              />
              <Info
                label="Fecha de Nacimiento"
                value={new Date(docente.fecha_nacimiento).toLocaleDateString()}
              />
              <Info
                label="Código Laboral"
                value={docente.codigo_laboral || "No disponible"}
              />
              <Info
                label="Disponibilidad"
                value={docente.isAvailable ? "Disponible" : "No disponible"}
              />
            </div>
            <div className="mt-6">
              <p className="text-sm text-blue-700">Dirección</p>
              <p className="text-lg font-medium text-gray-800">
                {docente.direccion || "No disponible"}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-green-900 mb-4">
                Cursos Asignados
              </h3>
              {docente.courses && docente.courses.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {docente.courses.map((curso, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-600 transition"
                    >
                      {curso.nombre}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">No tiene cursos asignados.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string | number }) => (
  <div>
    <p className="text-sm text-blue-600">{label}</p>
    <p className="text-lg font-medium text-gray-800">{value}</p>
  </div>
);

export default TeacherProfile;
