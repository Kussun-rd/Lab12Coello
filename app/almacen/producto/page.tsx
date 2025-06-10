'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
  stock: number;
  idCategoria: number;
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/productos'); 
      if (!res.ok) {
        throw new Error('Error al cargar los productos.');
      }
      const data: Producto[] = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado al cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (idProducto: number) => {
    setError(null);
    setSuccess(null);

    if (!confirm(`¿Estás seguro de que quieres eliminar el producto con ID ${idProducto}?`)) {
      return; 
    }

    try {
      const res = await fetch(`/api/productos/${idProducto}`, {
        method: 'DELETE', 
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al eliminar el producto.');
      }

      setSuccess(`Producto con ID ${idProducto} eliminado con éxito!`);
      fetchProducts();
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado al eliminar el producto.');
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="display-4 text-center mb-4">Gestión de Productos</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="d-flex justify-content-end mb-3">
        <Link href="/almacen/producto/new" className="btn btn-success btn-lg">
          <i className="bi bi-plus-circle-fill me-2"></i>Nuevo Producto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No hay productos registrados. Agrega uno nuevo.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Stock</th>
                <th scope="col">Categoría</th>
                <th scope="col" className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => ( 
                <tr key={product.idProducto}>
                <th scope="row">{index + 1}</th> {}
                <td>{product.nombre}</td>
                <td>S/. {product.precio.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>{product.idCategoria}</td>
                <td className="text-center">
              <Link href={`/almacen/producto/${product.idProducto}/edit`} className="btn btn-warning btn-sm me-2">
                <i className="bi bi-pencil-fill"></i> Editar
              </Link>
              <button
          onClick={() => handleDelete(product.idProducto)}
          className="btn btn-danger btn-sm"
            >
          <i className="bi bi-trash-fill"></i> Eliminar
          </button>
          </td>
          </tr>
          ))}
          </tbody>
          </table>
        </div>
      )}
    </div>
  );
}