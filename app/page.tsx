"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WhitelistPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        "https://www.ribh.xyz/api/v1/whitelist",
        {
          emails: [email], // Body format expected by the API
        }
      );

      if (response.status === 201 && response.data.success) {
        toast.success(response.data.message || "Successfully whitelisted!");
        setEmail(""); // Clear input after successful request
      } else {
        toast.error("Failed to whitelist. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* React Toastify Container */}
      <ToastContainer />

      {/* Logo */}
      <div className="mb-6">
        <Image
          src="https://res.cloudinary.com/dtfvdjvyr/image/upload/v1727773042/Logo_2_z410gu.png"
          alt="Logo"
          className="w-24 h-24 sm:w-32 sm:h-32" // More responsive sizing
          width={128} // Adjusting to more suitable size
          height={128}
        />
      </div>

      {/* Whitelist Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">
          Whitelist User
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Enter your email to get whitelisted" // Improved accessibility
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Whitelist"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhitelistPage;
