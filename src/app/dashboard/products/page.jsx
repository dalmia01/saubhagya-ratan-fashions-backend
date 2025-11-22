import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductItem from "./ProductItem";
import Link from "next/link";

export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find().lean();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link href="/dashboard/products/new" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
