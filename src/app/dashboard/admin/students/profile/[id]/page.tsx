"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Student,
  StudentResponse,
} from "../../../../../../interface/estudiante.interface";

const EstudianteProfile = () => {
  const [estudiante, setEstudiante] = useState<Student | null>(null);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    const fetchEstudiante = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/estudiantes/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el estudiante");
        }
        const data: StudentResponse = await response.json();
        setEstudiante(
          Array.isArray(data.data) ? data.data[0] || null : data.data || null
        );
      } catch (error) {
        console.error("Error al obtener el estudiante:", error);
        setEstudiante(null);
      }
    };

    fetchEstudiante();
  }, [id]);

  if (!estudiante) {
    return (
      <div className="text-center mt-10 text-green-700">
        Cargando información del estudiante...
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
                estudiante.image
                  ? `http://localhost:4000${estudiante.image}`
                  : "https://via.placeholder.com/150"
              }
              alt={`${estudiante.nombre} ${estudiante.apellido}`}
              className="w-56 h-56 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <img
                src={
                  estudiante.image
                    ? `http://localhost:4000${estudiante.image}`
                    : "https://via.placeholder.com/150"
                }
                alt={`${estudiante.nombre} ${estudiante.apellido}`}
                className="w-96 h-96 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
          </div>
          <div className="md:w-2/3 p-8 bg-green-100">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              {estudiante.nombre} {estudiante.apellido}
            </h2>
            <p className="text-blue-800 mb-6">{estudiante.user?.email}</p>
            <div className="grid grid-cols-2 gap-6">
              <Info
                label="Fecha de nacimiento"
                value={estudiante.fechaNacimiento}
              />
              <Info
                label="Género"
                value={estudiante.genero_id === 1 ? "Masculino" : "Femenino"}
              />
              <Info
                label="Teléfono"
                value={estudiante.telefono || "No disponible"}
              />
              <Info
                label="Disponibilidad"
                value={estudiante.isAvailable ? "Disponible" : "No disponible"}
              />
            </div>
            <div className="mt-6">
              <p className="text-sm text-blue-700">Dirección</p>
              <p className="text-lg font-medium text-gray-800">
                {estudiante.direccion || "No disponible"}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-green-900 mb-4">
                Cursos Asignados
              </h3>
              {estudiante.studentCourses &&
              estudiante.studentCourses.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {estudiante.studentCourses.map((curso) => (
                    <span
                      key={curso.id}
                      className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-600 transition"
                    >
                      {curso.courses.nombre}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">
                  El estudiante no cuenta con cursos matriculados
                </p>
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

export default EstudianteProfile;
