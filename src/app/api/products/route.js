import { verifyToken, getTokenFromCookies } from "../../../lib/auth";
import { connectDB } from "../../../lib/db";
import Product from "../../../models/Product";

export async function GET(req) {
  await connectDB();
  const token = getTokenFromCookies(req);
  const user = verifyToken(token);
  if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const products = await Product.find();
  return new Response(JSON.stringify(products), { status: 200, headers: { "Content-Type": "application/json" } });
}
