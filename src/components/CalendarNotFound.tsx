import React from "react";

const CalendarNotFound = () => {
  return (
    <>
      <div className=" flex flex-col justify-center items-center text-center text-2xl ">
        <div className=" text-red-600 text-2xl ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
        </div>
        <h5>Calendar could not be opened!</h5>
        <h5>This can be due to the following reasons:</h5>
        <p>
          - Incorrect address in address bar <br />- Missing internet connection{" "}
          <br />- Calendar has been deactivated <br />- Calendar no longer
          exists <br /> - Technical fault with connection error Your
          appointments are not affected in any way and are saved in our
          database! If problems persist, please contact support:
        </p>
        <h1>info@calendar.online</h1>
        <p>Information for support message:</p>
        <p>
          Time: 2024-05-21 16:34:55 Time zone: Asia/Calcutta Error code: 404
          Error message: ACCESS_LINK_NOT_FOUND Version: 1.5.6 (Web) URL:
          https://calendar.online/c488efc20b8811f8b7c
        </p>
      </div>
    </>
  );
};

export default CalendarNotFound;
