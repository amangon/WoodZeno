"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {

  const router = useRouter();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);

  async function handleRegister(e){

    e.preventDefault();

    setLoading(true);

    try{

      const res=await fetch("https://woodzeno-backend.onrender.com/api/auth/register",{

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        credentials:"include",

        body:JSON.stringify({
          name,
          email,
          password,
          role:"user"
        })

      });

      const data=await res.json();

      if(data.success){

        alert("Registration Successful");

        router.push("/auth/login");

      }else{

        alert(data.message);

      }

    }catch(err){

      console.log(err);

      alert("Server Error");

    }

    setLoading(false);

  }

  return(

<div className="min-h-screen bg-gray-100 flex items-center justify-center px-5">

<form
onSubmit={handleRegister}
className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
>

<h1 className="text-3xl font-bold text-center mb-2">

WoodZeno

</h1>

<p className="text-center text-gray-500 mb-8">

Create your account

</p>

<input
type="text"
placeholder="Full Name"
className="w-full border rounded-lg p-3 mb-4"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
type="email"
placeholder="Email"
className="w-full border rounded-lg p-3 mb-4"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
className="w-full border rounded-lg p-3 mb-6"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button
disabled={loading}
className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
>

{loading ? "Creating..." : "Register"}

</button>

<p className="text-center mt-6">

Already have an account?{" "}

<Link
href="/auth/login"
className="text-blue-600 font-semibold"
>

Login

</Link>

</p>

</form>

</div>

);

}
