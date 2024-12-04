'use client'

import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import SignInModal from "../modals/SignInModal";
import useProfile from "@/hooks/useProfile";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const { profile, logout } = useProfile();

  const menuItems = [
    "TERMS OF SERVICE",
    "Help & Feedback",
  ];

  return (
    <>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
          wrapper: '!max-w-unset',
        }}
      >
        <NavbarContent justify="start" className="pointer-events-none">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <div className="text-app-main font-bold text-2xl">
            VIVIVI
          </div>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {profile ? (
              <Button className="bg-white px-8 text-black" variant="light" radius="full" onClick={logout}>
                Sign Out
              </Button>
            ) : (
              <Button className="bg-white px-8 text-black" variant="light" radius="full" onClick={() => setIsSignInOpen(true)}>
                Sign In
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <SignInModal 
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </>
  );
}
