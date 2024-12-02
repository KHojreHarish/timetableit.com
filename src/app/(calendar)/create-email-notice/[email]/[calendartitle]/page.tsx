"use client";
import { createCalendarEmailNotice } from "@/lib/mailer";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const EmailNoticePage = ({
  params,
}: {
  params: { email: string; calendartitle: string };
}) => {
  const router = useRouter();

  const [email, setEmail] = useState(decodeURIComponent(params.email));
  const [title, setTitle] = useState(decodeURIComponent(params.calendartitle));
  const [isLoading, setIsLoading] = useState(false);

  const handleSendLinkSubmit = async () => {
    setIsLoading(true);
    try {
      await axios
        .post("/api/v1/create/email ", {
          identifier: email,
          title,
        })
        .then((response) => {
          if (response.data.success === true && response.status === 200) {
            toast.success("access link sent successfully");

            router.push("/");
            setIsLoading(false);
          }
        });
    } catch (error: any) {
      toast.error("something went wrong");

      setIsLoading(false);
    }
  };

  if (!email || !title) {
    toast.error("something went wrong");
  }

  const handleCreateCalendarSubmit = async () => {
    setIsLoading(true);
    try {
      await axios
        .post("/api/v1/create/calendar ", {
          identifier: email,
          title,
          mode: "overwrite",
        })
        .then((response) => {
          if (response.data.success === true && response.status === 200) {
            localStorage.setItem("calendar_id", response.data.calendar._id);
            router.push("/create");
          } else {
            toast.error("something went wrong");
            setIsLoading(false);
          }
        });
    } catch (error: any) {
      if (
        error.response.status === 409 &&
        error.response.data.success === false
      ) {
        toast("something went wrong");
        router.push("/");
      } else {
        toast.error("something went wrong");
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className=" h-screen w-full max-h-full flex justify-center items-center">
          <Spinner label="Loading..." color="default" />
        </div>
      ) : (
        <div className=" w-full h-full p-[10%] flex justify-center items-center ">
          <div id="register" className="  flex justify-center items-center ">
            <div className=" max-h-[40rem] max-w-[40rem]  bg-white rounded flex flex-col items-center p-[5%] shadow-blue ">
              <h2 className=" text-5xl  font-extralight text-[#283A4D] mb-3  ">
                Notice
              </h2>
              <div className=" w-10 h-1 m-1 bg-[#283A4D] rounded-xl mb-6 "></div>
              <h3 className=" flex text-center w-full ">
                A calendar has already been created with this email address. Do
                you want us to email you the access link to this calendar or do
                you want to create another calendar?
              </h3>
              <button
                onClick={() => handleSendLinkSubmit()}
                className=" h-14  m-4 rounded w-full text-3xl border border-[#5575A7] text-[#5575A7] hover:bg-[#5575A7] hover:text-white "
              >
                Send access Link
              </button>
              <button
                onClick={() => handleCreateCalendarSubmit()}
                className=" h-14  m-4 rounded w-full text-3xl border border-[#5575A7] text-[#5575A7] hover:bg-[#5575A7] hover:text-white "
              >
                Create New Calendar
              </button>
              <Link href={"#"}>Forgot your access link?</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmailNoticePage;
