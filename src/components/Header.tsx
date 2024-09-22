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
    </header>
  );
}
