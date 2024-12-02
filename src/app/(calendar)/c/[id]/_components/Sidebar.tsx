"use client";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";

const Sidebar = ({
  calendarId,
  subTimetableData,
  isSidebarOpen,
  setIsSidebarOpen,
  accessLevel,
  setEvents,
}: {
  isSidebarOpen: any;
  setIsSidebarOpen: any;
  subTimetableData: any;
  calendarId: string;
  accessLevel: string;
  setEvents: any;
}) => {
  const router = useRouter();

  const [allSubTimetableIds, setAllSubTimetableIds] = useState<string[]>(
    subTimetableData.map((sub: any) => sub.id)
  );

  const [checkedSubTimetables, setCheckedSubTimetables] = useState<string[]>(
    []
  );

  const [isMasterChecked, setIsMasterChecked] = useState(true);

  useEffect(() => {
    checkedSubTimetables.length === allSubTimetableIds.length &&
    new Set(checkedSubTimetables).size === new Set(allSubTimetableIds).size &&
    checkedSubTimetables.every((item) => allSubTimetableIds.includes(item))
      ? setIsMasterChecked(true)
      : setIsMasterChecked(false);
  }, [checkedSubTimetables, allSubTimetableIds]);

  const handleMasterChange = () => {
    if (isMasterChecked) {
      setCheckedSubTimetables([]);
      setEvents([]);
    } else {
      setCheckedSubTimetables(allSubTimetableIds);

      setEvents((prevEvents: any[]) => {
        // Get events for the toggled subtimetable
        const subEvents =
          subTimetableData.map((sub: any) => sub.events).flat() || [];
        return [...prevEvents, ...subEvents];
      });
    }
  };
  return (
    <>
      {/* sidebar (Lengends & SubCalendar List) */}
      {/* For Larger Screen */}
      <div
        className={` z-10 text-sm min-h-[93.5vh] h-[100%] absolute left-0 top-0 mdplus:static mdplus:block hidden truncate  ${
          isSidebarOpen ? "w-[15rem]" : "w-0"
        } `}
      >
        {/* Legend dropdown list */}

        {/* Sub calendar section */}
        <div className=" p-[5%] mt-8 h-[66.3vh] ">
          <div className=" text-xl font-bold">Standards</div>

          <div className=" w-full flex justify-between items-center ">
            <Button
              onClick={() => {
                router.push(`${calendarId}/settings/subcalendar`);
              }}
              variant="light"
              isIconOnly
              className=" -mr-3"
              isDisabled={
                accessLevel == "reader"
                  ? true
                  : accessLevel !== "modifier"
                  ? false
                  : true
              }
            >
              <Settings className=" h-5 w-5 " />
            </Button>
            <Checkbox
              isSelected={isMasterChecked}
              onChange={(e) => handleMasterChange()}
            >
              Select All
            </Checkbox>
          </div>
          <div id="hide-scrollbar" className=" overflow-y-scroll h-full">
            <CheckboxGroup
              value={checkedSubTimetables}
              onValueChange={(e) => {
                setCheckedSubTimetables(e);
              }}
            >
              {subTimetableData.map((subTimetable: any, idx: number) => (
                <div key={subTimetable.id}>
                  <label
                    className=" mt-2 flex justify-between items-center p-[2%] h-[30px] rounded font-bold "
                    style={{ backgroundColor: subTimetable.color }}
                  >
                    <h1 className=" w-[60%] truncate overflow-hidden ">
                      {subTimetable.name}
                    </h1>{" "}
                    <Checkbox
                      id={subTimetable.id}
                      value={subTimetable.id}
                      onChange={(e) => {
                        e.target.checked
                          ? setEvents((prevEvents: any[]) => {
                              // Show events for this subtimetable
                              return [...prevEvents, ...subTimetable.events];
                            })
                          : setEvents((prevEvents: any[]) =>
                              prevEvents.filter(
                                (event) =>
                                  !subTimetable.events.some(
                                    (subEvent: any) => subEvent.id === event.id
                                  )
                              )
                            );
                      }}
                      className=""
                    />
                    {/* <Checkbox
                    key={subTimetable.id}
                    onChange={(e) => handleSlaveChange(idx, e.target.checked)}
                  ></Checkbox> */}
                  </label>
                </div>
              ))}
            </CheckboxGroup>
          </div>
        </div>
      </div>

      {/* For Mobile Screen */}
      <dialog
        open={isSidebarOpen}
        className=" mdplus:hidden w-full h-full bg-transparent text-white z-20 absolute top-0 left-0 "
      >
        <div className=" w-full h-full bg-[#00000021] flex">
          <div className=" bg-white min-h-full min-w-[60%] text-black">
            {/* legend dropdown list */}
            <div>
              <div className=" p-[5%] pt-0 h-[66.3vh] ">
                <div className=" w-full flex justify-between items-center ">
                  <Button
                    // onClick={() => {
                    //   setIsLoading(true);
                    //   router.push(
                    //     `/${calendarId}/settings/subcalendar`
                    //   );
                    // }}
                    variant="light"
                    isIconOnly
                    className=" -mr-3"
                    // isDisabled={
                    //   accessLevel == "read"
                    //     ? true
                    //     : accessLevel !== "modifier"
                    //     ? false
                    //     : true
                    // }
                  >
                    <Settings className=" h-5 w-5 " />
                  </Button>
                  <div className=" text-[1rem]">Sub-calendar</div>
                  <input
                    type="checkbox"
                    // checked={showAllSubCalendars}
                    // onChange={handleShowAllChange}
                    className="myCheckbox"
                  />{" "}
                </div>
                <div id="hide-scrollbar" className=" overflow-y-scroll h-full">
                  {/* {TimetableData.subtimetables.map((subCalendar) => (
                    <div key={subCalendar.id}>
                      <label
                        className=" mt-2 flex justify-between items-center p-[2%] h-[30px] rounded font-bold "
                        style={{ backgroundColor: subCalendar.color }}
                      >
                        <h1 className=" w-[60%] truncate overflow-hidden ">
                          {subCalendar.name}
                        </h1>{" "}
                        <input
                          type="checkbox"
                          id={subCalendar.id}
                          value={subCalendar.id}
                          checked={visibleSubcalendarIds.includes(
                            subCalendar.id
                          )}
                          onChange={(e) => {
                            const newIds = [...visibleSubcalendarIds];
                            if (e.target.checked) {
                              newIds.push(e.target.value);
                            } else {
                              const index = newIds.indexOf(e.target.value);
                              newIds.splice(index, 1);
                            }
                            setVisibleSubcalendarIds(newIds);
                          }}
                          className="myCheckbox"
                        />
                      </label>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSidebarOpen(false);
            }}
            className=" h-full w-[50%]  bg-[#000000b6]"
          ></button>
        </div>
      </dialog>
    </>
  );
};

export default Sidebar;

// legend dropdown list
{
  /* <div
                className={`  flex flex-col p-[10%] pt-[5%] pb-[5%] w-[100%] truncate  ${
                  isLegendOpen ? "h-[2.1rem]" : "h-[100%]"
                } `}
              >
                <button
                  onClick={() => setisLegendOpen(!isLegendOpen)}
                  className=" text-base flex justify-between items-center  outline-none "
                >
                  {isLegendOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                      />
                    </svg>
                  )}
                  Legend
                  <span />
                </button>

                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="mr-2"
                  >
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                    <path
                      fillRule="evenodd"
                      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                    />
                  </svg>
                  Series event
                </div>

                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="mr-2"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                  </svg>
                  Read only
                </div>

                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className=" mr-2"
                  >
                    <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7" />
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                  </svg>
                  Add only
                </div>

                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="mr-2"
                  >
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                  </svg>
                  Reminders active
                </div>

                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="mr-2"
                  >
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    <path
                      fillRule="evenodd"
                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                    />
                  </svg>
                  Registrations enabled
                </div>

                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="mr-2"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                  </svg>
                  Sub-calendar visible
                </div>

                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="mr-2"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  </svg>
                  Sub-calendar hidden
                </div>
                <hr className="mt-2" />
              </div> */
}

// for mobile screen
{
  /* <div
                    className={`  flex flex-col p-[10%] pt-[5%] w-[100%] truncate  ${
                      isLegendOpen ? "h-[2.1rem]" : " h-fit"
                    } `}
                  >
                    <button
                      onClick={() => setisLegendOpen(!isLegendOpen)}
                      className=" text-base flex justify-cente items-center "
                    >
                      {isLegendOpen ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                          />
                        </svg>
                      )}
                      Legend
                    </button>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="mr-2"
                      >
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                        <path
                          fillRule="evenodd"
                          d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                        />
                      </svg>
                      Series event
                    </div>

                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="mr-2"
                      >
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                      </svg>
                      Read only
                    </div>

                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className=" mr-2"
                      >
                        <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                      </svg>
                      Add only
                    </div>

                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="mr-2"
                      >
                        <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                        <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                      </svg>
                      Reminders active
                    </div>

                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="mr-2"
                      >
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        <path
                          fillRule="evenodd"
                          d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                        />
                      </svg>
                      Registrations enabled
                    </div>

                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="mr-2"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                      </svg>
                      Sub-calendar visible
                    </div>

                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="mr-2"
                      >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      </svg>
                      Sub-calendar hidden
                    </div>
                    <hr className="mt-2" />
                  </div> */
}
