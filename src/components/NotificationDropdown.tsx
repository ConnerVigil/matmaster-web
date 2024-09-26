"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useState } from "react";
import { FaBell, FaPenSquare } from "react-icons/fa";
import MiniAvatar from "./MiniAvatar";
import Notification from "./Notification";
const MenuItemStyle =
  "block px-4 py-2 text-sm text-gray-600 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex items-center";

export default function NotificationDropdown() {
  const [notification] = useState(true);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          as="div"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-textPrimary cursor-pointer"
        >
          <FaBell size={20} />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-3 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {notification && (
          <Notification
            title="Report to Mat 9 by 9:55"
            description="You are late to your match. Please check in or risk being DQd."
            action="Forfeit"
          />
        )}
        <div className="py-1">
          <MenuItem>
            <a href="#" className={MenuItemStyle}>
              <FaBell className="mr-2" /> Match Results
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#" className={MenuItemStyle}>
              <MiniAvatar /> Followed Wrestler
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#" className={MenuItemStyle}>
              <MiniAvatar /> Followed Team
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#" className={MenuItemStyle}>
              <MiniAvatar /> Tourney Announcement
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#" className={MenuItemStyle}>
              <FaPenSquare className="mr-2" /> Bracket Announcement
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
