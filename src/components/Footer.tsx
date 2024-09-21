import React from "react";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="bg-white text-textPrimary h-32">
      <div className="flex flex-col px-4 py-6">
        <div className="flex items-center space-x-4 mb-2">
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
        <span className="text-sm text-gray-500">
          From setup to completion, MatMaster handles the details so you can
          focus on wrestling.
        </span>
      </div>

      <Divider />

      <div className="bg-white flex flex-col px-4 py-6">
        <div className="flex space-x-4 mb-2 py-2">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black "
          >
            <FaXTwitter size={24} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1877F2]"
          >
            <FaFacebook size={24} />
          </a>
        </div>
        <span className="text-sm text-gray-500">
          © 2024 MatMaster. All rights reserved.
        </span>
      </div>
    </div>
  );
}

const Divider = () => {
  return <hr style={{ borderTop: "1px solid lightgrey" }}></hr>;
};
