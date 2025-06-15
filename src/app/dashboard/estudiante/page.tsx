"use client";
import { useSession } from "next-auth/react";
import { FaRegSmileWink } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StudentDashboard() {
  const { data: session } = useSession();

  const roles = session?.user?.roles ?? [];
  const studentName = session?.user?.userName ?? "Estudiante";

  if (!roles.includes("estudiante")) {
    return <div>Acceso denegado</div>;
  }

  const progressData = {
    labels: ["📘 Ingles A1", "📗 computacion", "📕 programacion", "📙 Dibujo"],
    datasets: [
      {
        label: "Progreso (%)",
        data: [75, 50, 90, 60],
        backgroundColor: "rgba(255, 206, 100, 1.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const progressOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Progreso en tus cursos",
      },
    },
  };

  const messages = [
    "📢 Nueva actualización en el curso de Computacion basico.",
    "🎉 ¡Felicidades! Has completado el 90% del curso de ingles A1.",
    "📅 Recuerda asistir a la charla de ciberseguridad el viernes.",
  ];

  const events = [
    { title: "Jornada robotica", date: "2025-06-20" },
    { title: "Easter egg day", date: "2025-07-05" },
    { title: "Charla sobre ciberseguridad", date: "2025-08-15" },
    { title: "Aniversario de nueva guinea", date: "2025-08-15" },
  ];

  const blogs = [
    {
      title: "Consejos para aprender ingles de manera autodidacta",
      link: "https://www.classgap.com/es/blog/consejos-aprender-ingles-forma-autodidacta",
    },
    {
      title: "Por que optar por linux",
      link: "https://www.freecodecamp.org/espanol/news/11-razones-por-las-que-linux-es-increible/",
    },
    {
      title: "Easter egg - aprende sobre ello",
      link: "https://www.english-heritage.org.uk/easter/why-do-we-eat-eggs-at-easter/",
    },
  ];

  return (
    <main className="p-6 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-600 flex items-center gap-2">
          Hola, {studentName}! <FaRegSmileWink className="text-yellow-500" />
        </h1>
        <p className="text-gray-600 mt-2">
          Bienvenido a tu panel de estudiante. Aquí puedes ver tu progreso,
          eventos y más.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de progreso */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Progreso general
          </h2>
          <Bar data={progressData} options={progressOptions} />
        </div>

        {/* Card de mensajes */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Mensajes recientes
          </h2>
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <li key={index} className="text-gray-700">
                {message}
              </li>
            ))}
          </ul>
        </div>

        {/* Card de eventos próximos */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Eventos próximos
          </h2>
          <ul className="space-y-2">
            {events.map((event, index) => (
              <li key={index} className="text-gray-700">
                📅 {event.title} - {new Date(event.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>

        {/* Card de futuros cursos */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Futuros cursos
          </h2>
          <ul className="space-y-2">
            <li className="text-gray-700">
              🤖 Curso de Inteligencia Artificial
            </li>
            <li className="text-gray-700">
              📱 Curso de Desarrollo de Apps Móviles
            </li>
            <li className="text-gray-700">🔒 Curso de Ciberseguridad</li>
          </ul>
        </div>

        {/* Card de blogs */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Blogs recomendados
          </h2>
          <ul className="space-y-2">
            {blogs.map((blog, index) => (
              <li key={index} className="text-gray-700">
                <a href={blog.link} className="text-green-600 hover:underline">
                  {blog.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
