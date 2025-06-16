"use client";
import {
  GraduationCap,
  Calendar,
  ArrowRight,
  BookOpen,
  Clock,
  TrendingUp,
} from "lucide-react";
import { IoRibbon } from "react-icons/io5";

export interface StudentCourse {
  id: number;
  enrollmentDate: string;
  courses: {
    id: number;
    nombre: string;
  };
}

interface Props {
  courses: StudentCourse[];
}

export default function CursosEstudiantesCards({ courses }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getRandomProgress = () => Math.floor(Math.random() * 40) + 60;
  const getRandomHours = () => Math.floor(Math.random() * 30) + 15;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-4 mb-6 p-6 rounded-2xl bg-yellow-100 border border-yellow-200 shadow-sm">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-16 w-16 rounded-full border border-white shadow-md"
            />
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Community English Center
              </h1>
              <p className="text-gray-700 text-sm font-medium">
                Portal del Estudiante
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Mis Cursos Matriculados
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Gestiona tu progreso académico y accede a tus cursos matriculados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
            <div className="col-span-full">
              <div className="text-center p-12 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner">
                  <BookOpen className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No hay cursos matriculados
                </h3>
                <p className="text-gray-500">
                  Aún no estás inscrito en ningún curso. ¡Explora nuestro
                  catálogo!
                </p>
              </div>
            </div>
          ) : (
            courses.map((course, index) => {
              const progress = getRandomProgress();
              const hours = getRandomHours();

              return (
                <div
                  key={course.id}
                  className="group relative"
                  style={{
                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] group-hover:border-gray-300 overflow-hidden">
                    <div className="relative p-6 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full " />
                          Activo
                        </div>
                      </div>

                      <div className="pr-16">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center mb-4 shadow-sm">
                          <BookOpen className="w-6 h-6 text-rose-600" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-gray-900 transition-colors">
                          {course.courses.nombre}
                        </h3>

                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Inscrito el {formatDate(course.enrollmentDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-4">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                          <TrendingUp className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                          <p className="text-xs text-blue-600 font-medium mb-1">
                            Progreso
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-blue-700">
                              {progress}%
                            </span>
                          </div>
                        </div>

                        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                          <Clock className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                          <p className="text-xs text-amber-600 font-medium mb-1">
                            Tiempo
                          </p>
                          <p className="text-sm font-bold text-amber-700">
                            {hours}h
                          </p>
                        </div>
                      </div>

                      <button className="w-full group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-800 to-blue-700 p-3.5 text-white font-medium transition-all duration-300 hover:from-green-700 hover:to-green-600 hover:shadow-lg hover:shadow-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
                        <div className="flex items-center justify-center gap-2">
                          <span>Plan de estudio</span>
                          <IoRibbon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </div>
                      </button>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {courses.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Total de cursos activos: {courses.length}</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
