import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // ¡Añade esta línea!

export const metadata = {
  title: 'Mi API CRUD MySQL',
  description: 'Gestión de productos con Next.js y Prisma',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Navbar con clases de Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Inicio
            </a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {/* Eliminamos los enlaces de Ventas */}
                <li className="nav-item">
                  <a className="nav-link" href="/almacen/producto">
                    Almacén de Productos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="container mt-4">
          {children}
        </main>
      </body>
    </html>
  );
}