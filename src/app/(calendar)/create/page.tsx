"use client";
import { Link } from "@nextui-org/react";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";

const CreatePage = () => {
  const path = usePathname();
  const [calendarId, setCalendarId] = useState<SetStateAction<string>>();

  useEffect(() => {
    if (path.includes("/create")) {
      window.addEventListener("beforeunload", (event) => {
        event.preventDefault();
        localStorage.removeItem("calendar_id");
      });
    }

    let value;
    // Get the value from local storage if it exists
    value = localStorage.getItem("calendar_id") || "";
    setCalendarId(value);
  }, [path]);

  return (
    <>
      {calendarId ? (
        <div className="  w-full h-full flex  items-center justify-center text-start pt-[10%]  ">
          <div className=" w-[55rem] flex flex-col">
            <h1 className=" text-4xl font-light mb-[2rem]  ">
              Thank you very much for your registration!
            </h1>
            <h6 className=" mb-[1rem] ">
              You can access your calendar via the following administrator link:
            </h6>
            <Link isExternal href={`/${calendarId}`} showAnchorIcon>
              {`timetableit.com/${calendarId}`}
            </Link>

            <h6 className=" mt-[1rem] mb-4 ">
              Additional access links with read, edit, or admin rights can be
              created and edited at any time in the settings. You can access the
              settings by opening the calendar via the administrator link and
              clicking on the cogwheel icon in the upper right corner:{" "}
            </h6>
            <h3 className=" flex mb-8 ">
              {" "}
              Settings <Settings />{" "}
            </h3>
            
          </div>
        </div>
      ) : (
        <div className=" pt-[8%]  ">
          <div
            id="register"
            className="  h-[40rem] w-[100%] flex justify-center items-center   "
          >
            <form
              // onSubmit={handleCreateCalendarFormSubmit}
              className=" h-[28rem] w-[28rem] p-4 bg-white rounded flex flex-col items-center shadow-blue "
            >
              <h2 className=" text-3xl text-[#283A4D] mb-6  ">
                Crate calendar
              </h2>
              <div className=" w-14 h-1 bg-[#283A4D] rounded mb-6 "></div>
              <input
                placeholder="Calendar name(optional)"
                defaultValue={"My calendar"}
                name="calendar_name"
                type="text"
                // onChange={(e) => setName(e.target.value)}
                className=" h-14 p-4 outline-[#BFDEFF] rounded w-[100%] border border-[#0000001a] m-2 "
              />
              <input
                placeholder="E-mail address"
                name="email"
                type="email"
                // onChange={(e) => setEmail(e.target.value)}
                required
                className=" h-14 p-4 m-2 outline-[#BFDEFF] rounded w-[100%] border border-[#0000001a] "
              />
              <button
                type="submit"
                className=" h-14 p-4 m-4 rounded w-[100%] border border-[#5575A7] text-[#5575A7] hover:bg-[#5575A7] hover:text-white "
              >
                Create Free
              </button>
              <Link href={"/forge-link"}>Forgot your access link?</Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePage;
