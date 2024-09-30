import React from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import HamburgerMenuDropdown from "./HamburgerMenuDropdown";
import NotificationDropdown from "./NotificationDropdown";

export default function Header() {
  return (
    <header className="w-full">
      <div className="bg-white w-full h-16 flex items-center justify-between px-4 shadow-md text-textPrimary">
        <div className="flex items-center space-x-4 pl-6">
          <button className="text-textPrimary">
            <HamburgerMenuDropdown />
          </button>
          <div className="w-8 h-8 relative">
            <Image
              src="/MatMaster-60x60.svg"
              alt="Company Logo"
              width={60}
              height={60}
            />
          </div>
          <span className="text-lg font-bold">MatMaster</span>
        </div>
        <div className="flex items-center space-x-4 pr-6">
          <button className="text-textPrimary">
            <FaSearch size={20} />
          </button>
          <button className="text-textPrimary">
            <NotificationDropdown />
          </button>
        </div>
      </div>
    </header>
  );
}
