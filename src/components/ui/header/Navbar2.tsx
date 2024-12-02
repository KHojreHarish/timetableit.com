"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar2() {
  const path = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);

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
      "bg-[#FFFFFF]",
      "h-[4.5rem]",

      "shadow-xl",
      "z-10"
    );
  } else {
    navbarClasses.push("bg-transparent", "h-[5.5rem]");
  }

  return (
    <header
      style={{
        display: path == "/create" || "/create-email-notice" ? "flex" : "none",
      }}
      className={`${navbarClasses.join(
        " "
      )} flex justify-between p-8 pl-[14%] pr-[14%] items-center`}
    >
      <button onClick={() => router.replace("/")} className="m-[-0.3rem]">
        <Image
          src="/Logo.png"
          alt="Calendar.online"
          height={200}
          width={200}
        />
      </button>
      <ul className=" flex font-sans text-[#283A4D]">
        <li className="pl-[2rem] font-medium">
          <a href="#">START</a>
        </li>

        <li className="pl-[2rem] font-medium">
          <a href="#pricing">PRICING</a>
        </li>
        <li className="pl-[2rem] font-medium">
          <a href="#faq">FAQS</a>
        </li>
        <li className="pl-[2rem]  m-[-0.3rem]">
          <a href="#register">
            <button className=" border-[1px] border-[#5877A8] border-solid text-[#5877A8] rounded p-[5px] text-[0.9rem] pl-[1.8rem] pr-[1.8rem] shadow-xl text-bold hover:bg-[#5575A7] hover:text-white">
              Live Demo
            </button>
          </a>
        </li>
        <li className="pl-[2rem]  m-[-0.3rem]">
          <a href="#register">
            <button className=" border-[1px] border-[#5877A8] border-solid text-[#5877A8] rounded p-[5px] text-[0.9rem] pl-[1.8rem] pr-[1.8rem] shadow-xl text-bold hover:bg-[#5575A7] hover:text-white">
              Create Calendar
            </button>
          </a>
        </li>
      </ul>
    </header>
  );
}
