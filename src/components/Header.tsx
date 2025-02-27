import React from "react";
import Image from "next/image";
import HamburgerMenuDropdown from "./HamburgerMenuDropdown";
import NotificationDropdown from "./NotificationDropdown";
import Link from "next/link";
import { SearchMd } from "@untitled-ui/icons-react";

export default function Header() {
  return (
    <header className="w-full">
      <div className="bg-white w-full h-16 flex items-center justify-between px-4 shadow-md text-gray1 border-b border-gray-100">
        <div className="flex items-center space-x-2 pl-6">
          <button className="text-gray1">
            <HamburgerMenuDropdown />
          </button>
          <div className="w-8 h-8 relative">
            <Link href="/">
              <Image
                src="/images/MatMaster-60x60.svg"
                alt="Company Logo"
                width={60}
                height={60}
                priority
              />
            </Link>
          </div>
          <Link href="/">
            <span className="text-lg font-bold">MatMaster</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 pr-6">
          <button className="text-gray1">
            <SearchMd width={24} height={24} />
          </button>
          <button className="text-gray1">
            <NotificationDropdown />
          </button>
        </div>
      </div>
    </header>
  );
}
