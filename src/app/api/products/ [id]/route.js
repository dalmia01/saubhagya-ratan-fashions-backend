import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function DELETE(req, { params }) {
  await connectDB();
  await Product.findByIdAndDelete(params.id);
  return Response.json({ success: true });
}
