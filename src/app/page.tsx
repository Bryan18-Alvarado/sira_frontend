"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center text-gray-800">
      <header className="text-center py-12">
        <h1 className="text-6xl font-extrabold tracking-wider">
          Bienvenidos a{" "}
          <span className="animate-color-change text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500">
            SIRA
          </span>
        </h1>
        <p className="text-2xl mt-6 font-light">
          Tu puerta al aprendizaje. Cursos de inglés, tecnologías y más para
          niños y jóvenes.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* Section: Cursos */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-blue-300 to-blue-200 text-gray-800 p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-bold mb-4">Cursos de Inglés</h2>
            <p className="text-lg font-light">
              Aprende inglés desde nivel básico hasta avanzado con nuestros
              profesores expertos.
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-300 to-blue-200 text-gray-800 p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-4xl font-bold mb-4">Tecnologías</h2>
            <p className="text-lg font-light">
              Explora el mundo de la programación, diseño web, y más con
              nuestros cursos interactivos.
            </p>
          </div>
        </section>

        {/* Section: Futuros Eventos */}
        <section className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-center">
            Futuros Eventos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <img
                src="/images/event1.jpg"
                alt="Evento 1"
                className="rounded-lg shadow-md w-full h-64 object-cover transform transition-transform duration-300 hover:scale-105 hover:rotate-3"
              />
              <h3 className="text-xl font-bold">Taller de Programación</h3>
              <p className="text-sm">
                Aprende los fundamentos de programación en este taller
                interactivo.
              </p>
            </div>
            <div className="space-y-4">
              <img
                src="/images/graduacion.jpg"
                alt="Evento 2"
                className="rounded-lg shadow-md w-full h-64 object-cover transform transition-transform duration-300 hover:scale-105 hover:rotate-3"
              />
              <h3 className="text-xl font-bold">Concurso de Inglés</h3>
              <p className="text-sm">
                Participa en nuestro concurso de inglés y gana premios
                increíbles.
              </p>
            </div>
            <div className="space-y-4">
              <img
                src="/images/viaje.jpg"
                alt="Evento 3"
                className="rounded-lg shadow-md w-full h-64 object-cover transform transition-transform duration-300 hover:scale-105 hover:rotate-3"
              />
              <h3 className="text-xl font-bold text-center">
                Viaje al volcán madera
              </h3>
              <p className="text-sm">
                Explora con nosotros el volcán madera, un lugar lleno de
                aventura y naturaleza.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Acceso */}
        <div className="text-center">
          <Link
            href="/login"
            className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-blue-600 transition-transform transform hover:scale-110 shadow-lg"
          >
            Acceder al Sistema
          </Link>
        </div>
      </main>

      <footer className="mt-16 bg-blue-900 text-white py-12 w-full">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Sobre Nosotros</h3>
            <p className="text-sm">
              SIRA es una plataforma educativa diseñada para ofrecer cursos de
              alta calidad en inglés, tecnologías y más. Nuestro objetivo es
              empoderar a niños y jóvenes con habilidades esenciales para el
              futuro.
            </p>
          </div>
          {/* Card 2 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:underline">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          {/* Card 3 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Síguenos</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:scale-110">
                <img
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  className="w-8 h-8"
                />
              </Link>
              <Link href="https://twitter.com" className="hover:scale-110">
                <img
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  className="w-8 h-8"
                />
              </Link>
              <Link href="https://instagram.com" className="hover:scale-110">
                <img
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  className="w-8 h-8"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm font-light opacity-75">
            © 2023 SIRA. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes color-change {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-color-change {
          animation: color-change 3s infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}
