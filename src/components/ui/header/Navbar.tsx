"use client";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const path = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [display, setDisplay] = useState(
    path === "/" ? true : false || path === "/create" ? true : false
  );

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  let navbarClasses = [
    "fixed",
    "w-full",
    "transition-all",
    "duration-500",
    "ease-in-out",
  ];
  if (scrolled) {
    navbarClasses.push(
      "bg-[#000]",
      "h-[4.5rem]",

      "shadow-xl",
      "z-10"
    );
  } else {
    navbarClasses.push("bg-[#000] ", "h-[5.5rem]");
  }

  return (
    <>
      {display ? (
        <header
          className={`${navbarClasses.join(
            " "
          )} flex justify-between p-8 pl-[14%] pr-[14%] items-center`}
        >
          <Link href={"/"} className="m-[-0.3rem]">
            <Image
              src="/Logo.png"
              alt="/timetableit.com logo"
              height={200}
              width={200}
            />
          </Link>
          <ul className=" flex font-sans text-[#ffff00]">
            <li className="pl-[2rem] font-medium">
              <button className=" font-sans text-[#ffff00] ">
                <a href="/signup">Sign Up</a>
              </button>
            </li>
            <li className="pl-[2rem] font-medium">
              <button className=" font-sans text-[#ffff00] ">
                <a href="/login">LogIn</a>
              </button>
            </li>

            <li className="pl-[2rem]  m-[-0.3rem]">
              <a href="#register">
                <button className=" border-[1px] border-[#00ff00] border-solid text-[#ffff00] rounded p-[5px] text-[0.9rem] pl-[1.8rem] pr-[1.8rem] shadow-xl text-bold hover:bg-[#00ff00] hover:text-black hover:border-[#00ff00]">
                  Create Timetable
                </button>
              </a>
            </li>
          </ul>
        </header>
      ) : null}
    </>
  );
}
