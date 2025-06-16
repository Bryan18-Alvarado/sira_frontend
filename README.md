# SIRA Frontend

![SIRA Logo](/public/images/sira.jpeg)

SIRA (Frontend) es un sistema de registro académico para el **Community English Center (SIRA)**. Este proyecto fue creado con la iniciativa de facilitar la gestión académica, permitiendo a estudiantes, docentes y administrador interactuar con el sistema de manera eficiente. Está desarrollado con **Next.js**, **React**, y **TailwindCSS**, y se conecta a un backend basado en **NestJS** y **PostgreSQL**.

---

## 🚀 Tecnologías y Herramientas Utilizadas

- **Visual studio code**: Editor de codigo, recomendado por su amplio manejo de lenguajes, frameworks y amplia gama de plugins a su alcance.

- **Dbeaver**: Gestor de base de datos, destinado a administrar nuestra informacion.

- **Github Desktop**: es una aplicación gratuita y de código abierto que facilita la interacción con GitHub y otros servicios de hospedaje de Git a través de una interfaz gráfica de usuario

- **Postman**: es una plataforma integral para desarrollar y trabajar con APIs

- **Warp**: Terminal moderna, integra funciones como sugerencias inteligentes de comando, incluso permite edicion de codigo

- **Git**: Es un sistema de control de versiones

### Frameworks y Librerías Principales

- **Next.js**: Framework de React para aplicaciones web modernas.
- **React**: Biblioteca para construir interfaces de usuario.
- **TailwindCSS**: Framework de CSS para diseño rápido y responsivo.

### Gestión de Estado y Formularios

- **react-hook-form**: Manejo eficiente de formularios en React.

### Visualización de Datos

- **Chart.js**: Librería para crear gráficas interactivas.
- **react-chartjs-2**: Enlace para usar Chart.js con React.

### Autenticación y Seguridad

- **next-auth**: Solución de autenticación para Next.js (Actualmente se llama AuthJs, pero aun no tiene soporte para next14).
- **bcryptjs**: Para el hashing de contraseñas.

### Base de Datos y ORM

- **pg**: Cliente de PostgreSQL para Node.js.
- **TypeORM**: ORM para la gestión de la base de datos relacional.

### Utilidades y Estilo

- **fetch**: Cliente HTTP para realizar solicitudes al backend.
- **clsx**: Utilidad para manejar clases condicionales en React.
- **class-variance-authority**: Para gestionar variantes de clases CSS.
- **lucide-react**: Conjunto de íconos modernos para React.
- **react-icons**: Librería de íconos para React.
- **react-select**: Componente de selección personalizable.
- **sweetalert2**: Alertas personalizables para mejorar la experiencia del usuario.
- **Shadcn**: libreria con componentes ya creados y reutilizables

### Animaciones y Estilo Avanzado

- **tailwindcss-animate**: Extensión para animaciones en TailwindCSS.
- **tailwind-merge**: Para combinar clases de TailwindCSS de forma eficiente.

### Desarrollo y Configuración

- **eslint**: Herramienta para analizar y corregir problemas de código.
- **typescript**: Lenguaje de programación tipado para mejorar la calidad del código.
- **postcss**: Herramienta para transformar CSS con plugins.
- **pettier**:permite a los desarrolladores configurar las reglas que se aplicarán a su código y darle formato

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js**: v18 o superior, durante el desarrollo se utilizo NodeJs 20.9.0
- **npm**, **yarn**, **bun** o **pnpm**: Administrador de paquetes, utilizamos npm
- **PostgreSQL**: v14 o superior
- **Docker** (opcional): Para ejecutar servicios en contenedores (no se utilizo durante el desarrollo)

---

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Bryan18-Alvarado/sira_frontend.git
cd sira_frontend
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/sira
```

### 4. Configurar la base de datos

Si estás usando **TypeORM**, asegúrate de que las entidades estén configuradas correctamente y ejecuta las migraciones:

```bash
npm run typeorm migration:run
```

---

## 🚀 Ejecución del Proyecto

### Modo desarrollo

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Construcción para producción

```bash
npm run build
npm start
```

---

## 🖥️ Uso del Sistema

### Endpoints clave

- **Autenticación**:
  - `POST /auth/login`: Iniciar sesión
  - `POST /auth/register`: Registro de usuarios
- **Cursos**:
  - `GET /courses`: Listar cursos disponibles
  - `GET /courses/:id`: Detalles de un curso
- **Estudiantes**:
  - `GET /students`: Listar estudiantes
  - `GET /students/:id`: Detalles de un estudiante

### Capturas de pantalla

#### Login del sistema SIRA

![Login del sistema](/public//images/login.png)

**Login general**: con el uso de las credenciales, enruta al usuario según su código, correo y contraseña.

#### Dashboard del Admin

![Dashboard del Admin](/public/images/dashboard-admin.png)
**Dashboard del admin**: pagina de inicio del admin, donde puede ver sus cursos activos, sus estudiantes, y sus docentes. en el menu de hamburguesa puede acceder a las tablas de docentes, cursos, tutores, estudiantes, niveles

![Tablas de docente](/public/images/docentes-admin)
**Tablas de docentes**: tabla con CRUD de docente

![Formulario de docente](/public/images/agregar-docente)
**Formulario de docentes**: tabla con CRUD de docente

#### Tablas de Docentes

![Inicio de docente](/public/images/inicio-docente.jpeg)
**Inicio de docentes**: vista principal de docentes

![cursos asignados](/public/images/cursoos.jpeg)
**Cursos asignados**: vista de loscursos que ese docente tiene asignado docente

![vista de calificar cursos](/public/images/calificar.jpeg)
**Tablas de docentes**: vista para que el docente elija que curso calificar

![vista de home page estudiante](/public/images/home-estudiante.jpeg)
**Calificando docente**: vista para que el docente califique dependiendo de la asignacion

#### Tablas de Estudiantes

![vista cursos estudiante](/public/images/cursos-estudiantes.jpeg)
**vista para el estudiante vea sus cursos**: vista para que el estudiante pueda ver los cursos en los que esta matriculado

![vista de calificando a estudiantes](/public/images/calificaciones-estudiante.jpeg)
**vista calificaciones del estudiante**: vista para que el estudiante mire sus calificaciones

---

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de TailwindCSS](https://tailwindcss.com/docs)
- [Documentación de TypeORM](https://typeorm.io/)

---

## 🌐 Despliegue

El proyecto puede ser desplegado fácilmente en [Vercel](https://vercel.com/):
!NOTA: vercel suele tener un costo elevado

1. Conecta tu repositorio en Vercel.
2. Configura las variables de entorno en el panel de Vercel.
3. Haz clic en "Deploy".

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz un push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
   6.contacta a los colaboradores.

---

## 📝 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más información.
