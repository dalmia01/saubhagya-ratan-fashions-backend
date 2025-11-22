// src/app/api/products/route.js
import { NextResponse } from "next/server";
import { verifyToken, getTokenFromCookies } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// Middleware-like check for auth
async function checkAuth(req) {
  const token = getTokenFromCookies(req);
  const user = verifyToken(token);
  if (!user) throw NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return user;
}

// GET all products
export async function GET(req) {
  await connectDB();
  await checkAuth(req);

  const products = await Product.find();
  return NextResponse.json(products);
}

// POST new product
export async function POST(req) {
  await connectDB();
  await checkAuth(req);

  const data = await req.json();
  const product = await Product.create(data);
  return NextResponse.json(product, { status: 201 });
}

// PUT update product by id
export async function PUT(req) {
  await connectDB();
  await checkAuth(req);

  const { id, ...updates } = await req.json();
  if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

  const updated = await Product.findByIdAndUpdate(id, updates, { new: true });
  return NextResponse.json(updated);
}

// DELETE product by id
export async function DELETE(req) {
  await connectDB();
  await checkAuth(req);

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Product ID required" }, { status: 400 });

  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
