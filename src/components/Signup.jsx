// Signup.js
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStore from '@/store/store';

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup, signupError } = useStore();

  const handleSignup = async () => {
    const success = await signup(username, password);
    if (success) {
      router.push('/login');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
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
        onClick={handleSignup}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Signup
      </button>
      {signupError && <p className="text-red-500 mt-2">{signupError}</p>}
    </div>
  );
};

export default Signup;
