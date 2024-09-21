import React from "react";
import Image from "next/image";
import { FaBars, FaSearch, FaBell } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full">
      <div className="bg-white w-full h-16 flex items-center justify-between px-4 shadow-md text-textPrimary">
        <div className="flex items-center space-x-4 pl-6">
          <button className="text-textPrimary">
            <FaBars size={24} />
          </button>
          <div className="w-8 h-8 relative">
            <Image
              src="/MatMaster-60x60.svg"
              alt="Company Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span className="text-lg font-semibold">MatMaster</span>
        </div>
        <div className="flex items-center space-x-4 pr-6">
          <button className="text-textPrimary">
            <FaSearch size={20} />
          </button>
          <button className="text-textPrimary">
            <FaBell size={20} />
          </button>
        </div>
      </div>
      <div className="bg-primary w-full py-16 flex flex-col items-center">
        <div className="flex items-center mb-4">
          <div className="w-14 h-14 relative mr-4">
            <Image
              src="/MatMaster-60x60.svg"
              alt="Company Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className="text-5xl font-bold text-white">MatMaster</h1>
        </div>
        <p className="text-lg text-white mb-6">
          we innovate how you experience wrestling
        </p>
        <div className="w-full max-w-lg sm: px-2">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaSearch size={18} />
            </div>
            <input
              type="text"
              placeholder="Tournaments, Athletes, or Teams"
              className="w-full py-2 pl-10 pr-4 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
