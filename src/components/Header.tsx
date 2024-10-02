import React from "react";
import Image from "next/image";
import HamburgerMenuDropdown from "./HamburgerMenuDropdown";
import NotificationDropdown from "./NotificationDropdown";
import Link from "next/link";
import { SearchMd } from "@untitled-ui/icons-react";

export default function Header() {
  return (
    <header className="w-full">
      <div className="bg-white w-full h-16 flex items-center justify-between px-4 shadow-md text-textPrimary border-b border-gray-100">
        <div className="flex items-center space-x-4 pl-6">
          <button className="text-textPrimary">
            <HamburgerMenuDropdown />
          </button>
          <div className="w-8 h-8 relative">
            <Link href="/">
              <Image
                src="/MatMaster-60x60.svg"
                alt="Company Logo"
                width={60}
                height={60}
              />
            </Link>
          </div>
          <Link href="/">
            <span className="text-lg font-bold">MatMaster</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 pr-6">
          <button className="text-textPrimary">
            <SearchMd />
          </button>
          <button className="text-textPrimary">
            <NotificationDropdown />
          </button>
        </div>
      </div>
    </header>
  );
}
