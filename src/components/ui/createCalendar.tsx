import Link from "next/link";
import React, { useState } from "react";

const CreateCalendar = ({ onSubmit }: any) => {
  const [email, setEmail] = useState();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ e, email });
  };
  return (
    <form onSubmit={handleSubmit} className=" h-[15rem]">
      <div className=" bg-[#283A4D] h-[12rem] flex justify-center items-center flex-wrap">
        <input
          aria-label="Email"
          name="email"
          type="email"
          placeholder="E-mail address"
          required
          className=" h-[3rem] w-[20rem] rounded"
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          name="create_calendar"
          className=" h-[3rem] w-[20rem] rounded bg-white m-8 border-white outline-none hover:bg-[#455768] hover:text-white"
        >
          <span>Create a free Timetable</span>
        </button>
      </div>
    </form>
  );
};

export default CreateCalendar;
