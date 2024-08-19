// Login.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginError } = useStore();

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      router.push("/home");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
      
      {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
      <p className="text-center mt-6 text-gray-600">
        New here? <Link href="/signup" className="text-indigo-500 hover:text-indigo-600 font-semibold">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
