"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-pink-500">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl animate-fadeIn">
        
        {/* Left Side Gradient / Illustration */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-purple-500 to-pink-500 relative">
        
        </div>

        {/* Form */}
        <form className="w-full md:w-1/2 p-10 flex flex-col justify-center" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Welcome Back</h2>
          <p className="text-gray-500 mb-6">Sign in to your account</p>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <div className="flex items-center gap-2 mb-6">
            <input type="checkbox" id="remember" className="w-4 h-4" />
            <label htmlFor="remember" className="text-gray-600 text-sm">Remember me</label>
          </div>

          <button
  type="submit"
  className="w-full py-3 px-6 rounded-xl text-white font-bold text-lg
             bg-purple-600 shadow-lg shadow-purple-400/50
             hover:bg-purple-700 hover:shadow-xl
             active:translate-y-1 active:shadow-md
             transition-all duration-200"
>
  Sign In
</button>


        </form>
      </div>
    </div>
  );
}
