'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!nombre || !precio || !stock) {
      setError('Todos los campos (Nombre, Precio, Stock) son obligatorios.');
      return;
    }
    if (isNaN(parseFloat(precio)) || parseFloat(precio) <= 0) {
      setError('El precio debe ser un número positivo.');
      return;
    }
    if (isNaN(parseInt(stock)) || parseInt(stock) <= 0) {
      setError('El stock debe ser un número entero positivo.');
      return;
    }

    const defaultIdCategoria = 1; 

    try {
      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          precio: parseFloat(precio),
          stock: parseInt(stock),
          idCategoria: defaultIdCategoria,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al crear el producto.');
      }

      const newProduct = await res.json();
      setSuccess(`Producto "${newProduct.nombre}" creado con éxito!`);

      setNombre('');
      setPrecio('');
      setStock('');
      setTimeout(() => {
        router.push('/almacen/producto');
      }, 1500); 

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado.');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="display-5 text-center mb-4">Crear Nuevo Producto</h1>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="precio" className="form-label">Precio</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
            {}
            {}
            {}
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary btn-lg">
                <i className="bi bi-save me-2"></i> Guardar Producto
              </button>
              <Link href="/almacen/producto" className="btn btn-secondary btn-lg">
                <i className="bi bi-arrow-left-circle me-2"></i> Volver a la Lista
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}