import moment from "moment";
import React, { useMemo } from "react";

const Toolbar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  view,
  setView,
  currentDate,
  setCurrentDate,
  handleNavigate,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  currentDate: any;
  setCurrentDate: any;
  handleNavigate: any;
}) => {
  const dateText = useMemo(() => {
    if (view === "day") {
      return moment(currentDate).format("dddd:DD/MM/YYYY");
    }
    if (view === "week") {
      const from = moment(currentDate).startOf("week");
      const to = moment(currentDate).endOf("week");
      return `${from.format("MMMM DD")} - ${to.format("MMMM DD")}`;
    }
    if (view === "month") return moment(currentDate).format("MMMM YYYY");
    if (view === "year") return moment(currentDate).format("YYYY");
    if (view === "agenda") {
      const from = moment(currentDate);
      const to = moment(currentDate).add(1, "M");
      return `${from.format("MMMM DD")} - ${to.format("MMMM DD")}`;
    }
  }, [view, currentDate]);
  return (
    <>
      <nav className=" flex items-center justify-between flex-wrap">
        <div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className=" outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded m-2 active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
          >
            {isSidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
                <path
                  fillRule="evenodd"
                  d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => {}}
            className=" outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded m-2 active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </button>

          <button
            onClick={() => window.print()}
            className=" outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded m-2 active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white hidden mdplus:inline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
              <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
            </svg>
          </button>
        </div>

        <div className=" order-[-1] mdplus:order-none w-full mdplus:w-fit p-[1%] mdplus:p-0 mdplus:ml-0 text-2xl flex items-center justify-center ">
          {dateText?.toString()}{" "}
          <input
            type="date"
            value={moment(currentDate).format("YYYY-MM-DD")}
            onChange={(e) => {
              if (e.target.value) {
                setCurrentDate(new Date(e.target.value));
              } else {
                alert("please select a date");
                setCurrentDate(new Date());
              }
            }}
            className=" w-[1.8rem] text-black font-bold bg-transparent"
          />
        </div>

        <div className=" flex items-center ">
          <button
            onClick={() => {
              handleNavigate("prev", view);
              console.log("first");
            }}
            className=" outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded  active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
              />
            </svg>
          </button>

          <button
            onClick={() => handleNavigate("today", view)}
            className=" text-[14px] font-bold outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded  active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
          >
            Today
          </button>

          <button
            onClick={() => handleNavigate("next", view)}
            className=" outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded  active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
              />
            </svg>
          </button>
          <section className="hidden mdplus:flex ">
            <button
              onClick={() => setView("day")}
              className="text-[14px] font-bold outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded m-2 active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
            >
              Day
            </button>

            <button
              onClick={() => setView("week")}
              className="text-[14px] font-bold outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded m-2 active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
            >
              Week
            </button>

            <button
              onClick={() => setView("month")}
              className="text-[14px] font-bold outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded m-2 active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
            >
              Month
            </button>

            <button
              onClick={() => setView("year")}
              className="text-[14px] font-bold outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded m-2 active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
            >
              Year
            </button>

            <button
              onClick={() => setView("agenda")}
              className="text-[14px] font-bold outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded m-2 active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
            >
              List
            </button>

            <button
              onClick={() => setView("work_week")}
              className="text-[14px] font-bold outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded m-2 active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
            >
              Planner
            </button>
          </section>
          <section className="mdplus:hidden flex">
            <select
              defaultValue={"month"}
              onChange={(event) => setView(event.target.value)}
              className="text-[14px] font-bold outline-none border-[1px] border-[#D8D8D8] bg-[#efefef] p-1 rounded m-2 active:bg-blue-[#5575A7] hover:bg-[#5575A7] hover:text-white"
            >
              <option value={"day"}>Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
              <option value="agenda">List</option>
              <option value="work_week">Planner</option>
            </select>
          </section>
        </div>
      </nav>
    </>
  );
};

export default Toolbar;
