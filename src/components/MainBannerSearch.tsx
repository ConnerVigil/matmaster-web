import React from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export default function MainBannerSearch() {
  return (
    <div className="bg-primary w-full py-16 flex flex-col items-center relative">
      <div className="absolute bottom-0 left-0">
        <LeftTriangle />
      </div>
      <div className="absolute bottom-0 right-0 transform">
        <RightTriangle />
      </div>
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
  );
}

function LeftTriangle() {
  return (
    <div className="w-0 h-0 border-b-[100px] border-b-white border-r-[200px] border-r-transparent"></div>
  );
}

function RightTriangle() {
  return (
    <div className="w-0 h-0 border-b-[100px] border-b-white border-l-[200px] border-l-transparent"></div>
  );
}
