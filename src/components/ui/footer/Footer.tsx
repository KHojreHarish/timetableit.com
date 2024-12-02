"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { IoIosMail } from "react-icons/io";
const Footer = () => {
  const path = usePathname();

  const [display, setDisplay] = useState(
    path === "/" ? true : false || path === "/create" ? true : false
  );
  return (
    <>
      {display ? (
        <div className=" pl-[10%] pr-[10%] h-[25rem] bg-[#283A4D] w-full mt-4 flex justify-center pt-[2%]  text-white">
          <div className=" m-8 mr-[15rem] ">
            <h1 className="text-2xl">Resources</h1>
            <div className="mt-4 h-1 w-12 rounded mb-8 bg-white "></div>
            <ul>
              <li className=" mt-4 mb-4">
                <span></span>{" "}
                <a title="About us" href="/c/about">
                  
                </a>
              </li>
              <li className=" mt-4 mb-4">
                <span></span> Help{" "}
              </li>
              <li className=" mt-4 mb-4">
                <span></span> Book a Meeting{" "}
              </li>
              <li className=" mt-4 mb-4">
                <span></span> Privacy Policy <a href="/"></a>
              </li>
            </ul>
          </div>
          
          <div className=" m-8  ">
            <h1 className=" text-2xl">Contact</h1>
            <div className="mt-4 h-1 w-12 rounded bg-white"></div>
            <ul>
              <li className=" mt-4 mb-4">
                <span></span>{" "}
                <a title="About us" href="/c/about">
                 support@timetableit.com
                </a>
              </li>
              <li className=" mt-4 mb-4">
                <span></span>{" "}
              </li>
              <li className=" mt-4 mb-4">
                <span></span> Mumbai, India{" "}
              </li>
              <li className=" mt-4 mb-4">
                <span></span> @<a href="/">timetable.com 2024</a>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Footer;
