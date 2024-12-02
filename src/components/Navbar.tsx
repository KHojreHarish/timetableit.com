"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import NextImage from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";

export default function Navbar() {
  const [isExistingUser, setExistingUser] = useState(false);
  const [userEmail, setUserEmail] = useState<SetStateAction<any>>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setExistingUser(true);
        setUserEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Nav maxWidth="full" height={"4rem"}>
      <NavbarBrand>
        <Image
          as={NextImage}
          src="/Logo.png"
          alt=""
          height={150}
          width={150}
          radius="sm"
          className=" opacity-100 "
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Pricing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      {isExistingUser ? (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} href="/timetables">
              Go to Dashboard
            </Button>
          </NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                showFallback
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userEmail}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Profile</DropdownItem>
              <DropdownItem key="team_settings">Settings</DropdownItem>
              {/* <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem> */}
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} href="/signup">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Nav>
  );
}
