"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import MiniAvatar from "./MiniAvatar";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import {
  Award01,
  Bell01,
  HelpCircle,
  LogIn01,
  LogOut01,
  Menu01,
  MinusCircle,
  Settings01,
  UserPlus01,
  Users01,
} from "@untitled-ui/icons-react";
import { userService } from "@/lib/frontend/services/userService";
import { User } from "@prisma/client";

const MenuItemStyle =
  "block px-4 py-2 text-sm text-gray-600 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 flex items-center";

export default function HamburgerMenuDropdown() {
  const { user } = useUser();
  const [userFromDB, setUserFromDB] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const res = await userService.getUserFromDB();
        setUserFromDB(res);
      }
    };

    fetchUser();
  }, [user]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          as="div"
          className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray1 cursor-pointer"
        >
          <Menu01 width={24} height={24} />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute left-0 z-10 mt-3 w-56 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a href="#" className={MenuItemStyle}>
              <MinusCircle className="mr-2" width={16} height={16} />{" "}
              Tournaments & Meets
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#" className={MenuItemStyle}>
              <Award01 className="mr-2" width={16} height={16} /> Rankings
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#" className={MenuItemStyle}>
              <Users01 className="mr-2" width={16} height={16} /> Teams & Clubs
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#" className={MenuItemStyle}>
              <Bell01 className="mr-2" width={16} height={16} /> Notifications
            </a>
          </MenuItem>
          <MenuItem>
            <a href="#" className={MenuItemStyle}>
              <Settings01 className="mr-2" width={16} height={16} /> Settings
            </a>
          </MenuItem>

          {user ? (
            <>
              <MenuItem>
                <a href="#" className={MenuItemStyle}>
                  <HelpCircle className="mr-2" width={16} height={16} /> Support
                </a>
              </MenuItem>
              <MenuItem>
                <a href="#" className={MenuItemStyle}>
                  <UserPlus01 className="mr-2" width={16} height={16} /> Invite
                  colleagues
                </a>
              </MenuItem>
            </>
          ) : (
            <></>
          )}

          <MenuItem>
            <div className="h-10 cursor-default"></div>
          </MenuItem>
        </div>
        <div className="py-1">
          {user ? (
            <>
              <MenuItem>
                <a href="#" className={MenuItemStyle}>
                  <div className="flex items-center">
                    <MiniAvatar
                      src={
                        userFromDB?.Profile_Image_URL ||
                        "/images/defaultuser.png"
                      }
                    />
                    {user.name}
                  </div>
                </a>
              </MenuItem>
              <MenuItem>
                <Link href="/yourevents" className={MenuItemStyle}>
                  <MinusCircle className="mr-2" width={16} height={16} /> Your
                  events
                </Link>
              </MenuItem>
              <MenuItem>
                <a href="#" className={MenuItemStyle}>
                  <Users01 className="mr-2" width={16} height={16} /> Your teams
                </a>
              </MenuItem>
              <MenuItem>
                <a className={MenuItemStyle} href="/api/auth/logout">
                  <LogOut01 className="mr-2" width={16} height={16} /> Log out
                </a>
              </MenuItem>
            </>
          ) : (
            <div className="p-2 flex justify-between">
              <a href="/api/auth/signup" className="w-[48%]">
                <div className="w-full px-4 py-2 bg-primary text-white rounded-md text-sm font-semibold text-center">
                  Sign up
                </div>
              </a>
              <a href="/api/auth/login" className="w-[48%]">
                <div className="w-full px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-md text-sm font-semibold flex items-center justify-center">
                  <LogIn01 className="mr-2" width={16} height={16} /> Log in
                </div>
              </a>
            </div>
          )}
        </div>
      </MenuItems>
    </Menu>
  );
}
