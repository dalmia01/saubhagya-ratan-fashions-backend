import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link className="hover:text-purple-400" href="/dashboard">Dashboard</Link>
        <Link className="hover:text-purple-400" href="/dashboard/products">Products</Link>
      </nav>
    </aside>
  );
}
