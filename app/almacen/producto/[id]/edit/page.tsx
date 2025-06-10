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

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params; 
  const router = useRouter();

  const [product, setProduct] = useState<Producto | null>(null);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/productos/${id}`); 
        if (!res.ok) {
          throw new Error('Producto no encontrado.');
        }
        const data: Producto = await res.json();
        setProduct(data);
        setNombre(data.nombre);
        setPrecio(data.precio.toString()); 
        setStock(data.stock.toString());   
        setIdCategoria(data.idCategoria.toString()); 
      } catch (err: any) {
        setError(err.message || 'Error al cargar el producto.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!nombre || !precio || !stock || !idCategoria) {
      setError('Todos los campos son obligatorios.');
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
    if (isNaN(parseInt(idCategoria)) || parseInt(idCategoria) <= 0) {
      setError('La categoría debe ser un número entero positivo.');
      return;
    }

    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          precio: parseFloat(precio),
          stock: parseInt(stock),
          idCategoria: parseInt(idCategoria),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Error al actualizar el producto.');
      }

      const updatedProduct = await res.json();
      setSuccess(`Producto "${updatedProduct.nombre}" actualizado con éxito!`);
      setTimeout(() => {
        router.push('/almacen/producto');
      }, 1500);

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado.');
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
        <Link href="/almacen/producto" className="btn btn-secondary mt-3">Volver a la Lista</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="display-5 text-center mb-4">Editar Producto (ID: {id})</h1>

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
            <div className="mb-3">
              <label htmlFor="idCategoria" className="form-label">ID Categoría</label>
              <input
                type="number"
                className="form-control"
                id="idCategoria"
                value={idCategoria}
                onChange={(e) => setIdCategoria(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-warning btn-lg">
                <i className="bi bi-arrow-repeat me-2"></i> Actualizar Producto
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