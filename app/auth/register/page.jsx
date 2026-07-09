"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const API = process.env.NEXT_PUBLIC_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration Failed");
        return;
      }

      alert("Registration Successful");

      router.push("/auth/login");
    } catch (err) {
      console.log(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Create Admin
        </h1>

        <form onSubmit={handleRegister} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 text-white outline-none"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg text-white font-semibold"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cyan-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}