"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    mainImage: "",
    otherImages: "",
    inStock: false,
  });

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form, otherImages: form.otherImages.split(",") };
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    router.push("/dashboard/products");
  }

  return (
    <form className="bg-white p-6 rounded shadow max-w-lg mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <input className="border p-2 rounded" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })}/>
      <input className="border p-2 rounded" placeholder="Price" type="number" onChange={e => setForm({ ...form, price: e.target.value })}/>
      <input className="border p-2 rounded" placeholder="Quantity" type="number" onChange={e => setForm({ ...form, quantity: e.target.value })}/>
      <textarea className="border p-2 rounded" placeholder="Description" onChange={e => setForm({ ...form, description: e.target.value })}/>
      <input className="border p-2 rounded" placeholder="Main Image URL" onChange={e => setForm({ ...form, mainImage: e.target.value })}/>
      <input className="border p-2 rounded" placeholder="Other Images (comma separated)" onChange={e => setForm({ ...form, otherImages: e.target.value })}/>
      <label className="flex items-center gap-2">
        <input type="checkbox" onChange={e => setForm({ ...form, inStock: e.target.checked })}/>
        In Stock
      </label>
      <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Save</button>
    </form>
  );
}
