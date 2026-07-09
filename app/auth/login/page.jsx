"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/cms");
    } catch (err) {
      alert("Server Error");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Please Wait..." : "Login"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-cyan-400">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}