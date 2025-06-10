import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(req: Request) {
  const data = await req.json();
  const producto = await prisma.producto.create({ data });
  return NextResponse.json(producto);
}

export async function GET() {
  const productos = await prisma.producto.findMany();
  return NextResponse.json(productos);
}