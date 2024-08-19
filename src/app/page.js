"use client";
import Link from "next/link";
import useStore from "@/store/store";

export default function Home() {
  const { isLoggedIn } = useStore();
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <Navbar /> */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Facial Recognition Data Logger
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Welcome to the official platform for logging face recognition data.
          </p>
          <div className="flex justify-center">
            {isLoggedIn ? (
              <Link
                href="/home"
                className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition duration-300"
              >
                Home
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-blue-900 text-white px-6 py-3 rounded-md mr-4 hover:bg-blue-800 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
