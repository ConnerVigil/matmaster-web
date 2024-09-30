import React from "react";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div>
      <div className="bg-white text-textPrimary h-auto">
        <div className="flex justify-between px-4 py-8">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="/MatMaster-60x60.svg"
                  alt="MatMaster Logo"
                  width={60}
                  height={60}
                />
              </div>
              <span className="text-lg font-semibold">MatMaster</span>
            </div>
            <span className="text-sm text-gray-500 sm:w-full w-3/4">
              From setup to completion, MatMaster handles the details so you can
              focus on wrestling.
            </span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold mb-2 text-primary">
              Get the app
            </span>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/AppleStoreBadge.svg"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/GooglePlayBadge.png"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>
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
