"use client";
import { useRouter } from "next/navigation";

export default function ProductItem({ product }) {
  const router = useRouter();

  async function handleDelete() {
    await fetch(`/api/products/${product._id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col">
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">Price: ${product.price}</p>
      <p className="text-gray-600 mb-2">Quantity: {product.quantity}</p>
      <button
        onClick={handleDelete}
        className="mt-auto bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}
