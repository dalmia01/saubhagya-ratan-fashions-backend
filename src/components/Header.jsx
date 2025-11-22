"use client";  // ← This is required for all client-side hooks

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  function logout() {
    Cookies.remove("token");
    router.push("/login");
  }

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <button
        onClick={logout}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Logout
      </button>
    </header>
  );
}
