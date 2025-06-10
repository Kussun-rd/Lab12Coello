# MI-API-CRUD-MYSQL
Sistema de gestión de productos (CRUD) desarrollado con **Next.js 13+ (App Router)** para el frontend, **Next.js API Routes** para el backend, **Prisma ORM** y **MySQL** como base de datos. Este proyecto fue creado como parte de un laboratorio de *Desarrollo de Aplicaciones Web Avanzado*.

---

## ✨ Características

-   **CRUD Completo para Productos**:
    -   **Crear**: Añadir productos con nombre, precio, stock y categoría.
    -   **Leer**: Visualizar lista completa o paginada de productos.
    -   **Actualizar**: Editar productos existentes.
    -   **Eliminar**: Eliminar productos de la base de datos.
-   **Interfaz Moderna**: Implementada con **Bootstrap 5** y **Bootstrap Icons**.
-   **APIs RESTful**: Rutas bien definidas para una interacción eficiente.
-   **Feedback Visual**: Confirmación clara de todas las operaciones realizadas.
-   **Preparado para Despliegue**: Compatible con plataformas como Vercel y otras.

---

## 🛠️ Tecnologías Utilizadas

-   **Framework Full-stack**: [Next.js 13+](https://nextjs.org/)
-   **Base de Datos**: [MySQL](https://www.mysql.com/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Estilos**: [Bootstrap 5](https://getbootstrap.com/), [Bootstrap Icons](https://icons.getbootstrap.com/)
-   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
-   **Gestor de Paquetes**: [npm](https://www.npmjs.com/)

---

## 📂 Estructura del Proyecto

```

mi-api-crud-mysql/
├── app/
│ ├── api/productos/           \# Rutas API
│ │ ├── [id]/route.ts          \# GET, PUT, DELETE por ID
│ │ └── route.ts               \# POST, GET ALL
│ ├── almacen/producto/        \# Frontend
│ │ ├── [id]/edit/page.tsx     \# Editar producto
│ │ ├── new/page.tsx           \# Crear producto
│ │ └── page.tsx               \# Listado de productos
│ ├── lib/prisma.ts            \# Configuración Prisma
│ ├── globals.css              \# Estilos globales
│ ├── layout.tsx               \# Layout principal
│ └── page.tsx                 \# Página de inicio
├── prisma/schema.prisma       \# Esquema Prisma
├── .env                       \# Variables de entorno
├── package.json
└── tsconfig.json

````

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes elementos:

-   **Node.js**: v18.x o superior
-   **npm**: (viene incluido con Node.js)
-   **MySQL Server**
-   **Git**
-   **Editor de código**: Como [Visual Studio Code](https://code.visualstudio.com/)

---

## 🚀 Configuración y Ejecución

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

### 1️⃣ Clonar el repositorio

```bash
git clone [https://github.com/Kussun-rd/Lab12Coello.git](https://github.com/Kussun-rd/Lab12Coello.git)
cd Lab12Coello
````

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Crear la base de datos MySQL

Abre tu cliente MySQL y ejecuta el siguiente comando:

```sql
CREATE DATABASE semana_12_dawa;
```

### 4️⃣ Configurar el archivo `.env`

Crea un archivo llamado `.env` en la raíz del proyecto y agrega el siguiente contenido, reemplazando los marcadores de posición con tus credenciales de MySQL:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/semana_12_dawa"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

Reemplaza `USER`, `PASSWORD`, `HOST`, `PORT` con tus credenciales de MySQL.

### 5️⃣ Ejecutar migraciones de Prisma y generar el cliente

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6️⃣ Iniciar la aplicación

```bash
npm run dev
```

Una vez que la aplicación esté corriendo, ábrela en tu navegador: [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

-----

## 💡 Uso de la Aplicación

Dirígete a la URL de productos para empezar a gestionar tus productos: [http://localhost:3000/almacen/producto](https://www.google.com/search?q=http://localhost:3000/almacen/producto)

Desde la interfaz, podrás crear, editar y eliminar productos de forma sencilla.

-----

## 🌐 Endpoints de la API

Los siguientes son los endpoints de la API disponibles:

| Método | Endpoint                | Descripción                   |
| :----- | :---------------------- | :---------------------------- |
| `GET`  | `/api/productos`        | Obtener todos los productos   |
| `POST` | `/api/productos`        | Crear un nuevo producto       |
| `GET`  | `/api/productos/{id}`   | Obtener un producto por ID    |
| `PUT`  | `/api/productos/{id}`   | Actualizar un producto por ID |
| `DELETE` | `/api/productos/{id}` | Eliminar un producto por ID   |

```
