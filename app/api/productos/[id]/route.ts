import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma'; 

export async function GET(
  request: Request, 
  { params }: { params: { id: string } } 
) {
  const { id } = params;
  const producto = await prisma.producto.findUnique({
    where: {
      idProducto: parseInt(id), 
    },
  });

  if (!producto) {
    return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
  }

  return NextResponse.json(producto);
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const producto = await prisma.producto.update({
    where: { idProducto: parseInt(params.id) },
    data,
  });
  return NextResponse.json(producto);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.producto.delete({
    where: { idProducto: parseInt(params.id) },
  });
  return NextResponse.json({ message: 'Producto eliminado' });
}