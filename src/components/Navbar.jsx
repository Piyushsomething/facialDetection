"use client";
import React, { useEffect, useState } from "react";
import useStore from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isLoggedIn, logout, setIsLoggedIn,username, fetchUsername,tokenError } = useStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setIsLoggedIn(!!accessToken);
  
    if (accessToken) {
      fetchUsername(accessToken).finally(() => {
        setLoading(false);
        if (tokenError) {
          localStorage.removeItem("access_token");
          router.push("/404");
        }
      });
    } else {
      setLoading(false);
    }
  }, [setIsLoggedIn, fetchUsername,tokenError,router]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-white mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span className="text-white text-lg font-semibold">
                Facial Recognition Data Logger
              </span>
            </div>
          </Link>
          
          {isLoggedIn ? (
              <>
                {loading ? (
                  <span className="text-white">Loading...</span>
                ) : (
                  <span className="text-white">Welcome, {username || "User"}!</span>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-900 px-4 py-2 rounded-md hover:bg-blue-800 hover:text-white focus:outline-none"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <p className="bg-white text-blue-900 px-4 py-2 rounded-md hover:bg-blue-800 hover:text-white focus:outline-none">
                  Login
                </p>
              </Link>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
