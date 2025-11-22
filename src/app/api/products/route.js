// src/app/api/products/route.js
import { verifyToken, getTokenFromCookies } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

// Simple auth check
async function checkAuth(req) {
  const token = getTokenFromCookies(req);
  const user = verifyToken(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return user;
}

// GET all products
export async function GET(req) {
  await connectDB();

  const authCheck = await checkAuth(req);
  if (authCheck instanceof Response) return authCheck; // unauthorized

  const products = await Product.find();
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// POST new product
export async function POST(req) {
  await connectDB();

  const authCheck = await checkAuth(req);
  if (authCheck instanceof Response) return authCheck;

  const data = await req.json();
  const product = await Product.create(data);

  return new Response(JSON.stringify(product), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

// PUT update product
export async function PUT(req) {
  await connectDB();

  const authCheck = await checkAuth(req);
  if (authCheck instanceof Response) return authCheck;

  const { id, ...updates } = await req.json();
  if (!id) {
    return new Response(JSON.stringify({ error: "Product ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const updated = await Product.findByIdAndUpdate(id, updates, { new: true });
  return new Response(JSON.stringify(updated), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// DELETE product
export async function DELETE(req) {
  await connectDB();

  const authCheck = await checkAuth(req);
  if (authCheck instanceof Response) return authCheck;

  const { id } = await req.json();
  if (!id) {
    return new Response(JSON.stringify({ error: "Product ID required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await Product.findByIdAndDelete(id);
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
