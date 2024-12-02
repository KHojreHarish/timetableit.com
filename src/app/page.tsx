"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import CreateCalendar from "@/components/ui/createCalendar";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";

const osans = Open_Sans({ subsets: ["latin"] });
export default function Home() {
  const landingPage = true;
  const router = useRouter();

  const [name, setName] = useState<SetStateAction<string>>("My timetable");
  const [email, setEmail] = useState<SetStateAction<string>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateCalendarFormSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios
        .post("/api/v1/create/calendar ", { identifier: email, title: name })
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
        const { identifier, title } = error.response.data.calendar;
        router.push(`create-email-notice/${identifier}/${title}`);
      } else {
        setIsLoading(false);
        toast.error("something went wrong");
      }
    }
  };
  const handleCreateDemoCalendar = async () => {
    setIsLoading(true);
    try {
      await axios
        .post("/api/v1/create/calendar/democalendar")
        .then((response) => {
          if (response.data.success === true && response.status === 200) {
            router.push(`/${response.data.calendar._id}`);
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
        setIsLoading(false);
        toast.error("something went wrong");
      }
    }
  };

  return (
    <>
      <>
        <Navbar />
        {isLoading ? (
          <div className=" h-screen w-full max-h-full flex justify-center items-center">
            <Spinner label="Loading..." color="default" />
          </div>
        ) : (
          <main
            className={`${osans.className} min-h-screen  pt-[15%] bg-red-80 `}
          >
            <div className="pl-[10%] pr-[10%]">
              <div className="flex w-full font-medium justify-center  text-6xl text-[#283A4D] ">
                Share Your School Timetable Easily
              </div>

              <p className="flex justify-center mt-12 text-2xl text-[#53657D]">
                Easily organize, plan, and share
              </p>

              <div className="flex justify-center mt-12  text-xl w-full">
                <a
                  target="_blank"
                  className="m-[0.5rem] border-solid border-[1px] border-[#CF3241] text-[#CF3241] p-2 pl-6 pr-6 rounded hover:bg-[#CF3241] hover:text-white shadow-xl"
                  onClick={() => {
                    handleCreateDemoCalendar();
                  }}
                >
                  Book a Demo
                </a>
                <Link
                  href={"#register"}
                  className="m-[0.5rem] border-solid border-[1px] border-[#5575A7] text-[#5575A7] p-2 pl-6 pr-6 rounded hover:bg-[#5575A7] hover:text-white shadow-xl"
                >
                  Create Timetable
                </Link>
              </div>

              <div className=" transition-none w-full flex">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 4000,
                      stopOnInteraction: true,
                    }),
                  ]}
                  className="flex justify-center text-white m-[5%] w-full ml-[13%]"
                >
                  <CarouselContent className="">
                    <CarouselItem>
                      <Image
                        src="/Canva/1-min.png"
                        alt=""
                        height={1080}
                        width={900}
                        priority={false}
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <Image
                        src="/Canva/6.png"
                        alt=""
                        height={1080}
                        width={900}
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <Image
                        src="/Canva/11.png"
                        alt=""
                        height={1080}
                        width={900}
                      />
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </div>

            <CreateCalendar
              onSubmit={(e: any) => {
                setEmail(e.email);
                handleCreateCalendarFormSubmit(e.e);
              }}
            />

            <div id="features" className="mb-8"></div>
            <div className="pl-[10%] pr-[10%]  flex flex-wrap ">
              <div className=" w-1/2 p-[5%] text-[#537185] h-[17rem] ">
                <h2 className=" text-3xl text-[#283A4D] mb-6">
                  Easy access without login{" "}
                </h2>
                <p className="mb-4">
                  Access your timetable via access links without a login.
                  <br />
                  For example:{" "}
                  <a
                    href="https://timetableit.com"
                    target="_blank"
                    className=" text-[#273F59]"
                  >
                    https://timetableit.com
                  </a>
                </p>

                <p className=" mb-4">
                  For your timetable you get several access links for which you
                  can set individual permissions (e.g. read or write).{" "}
                </p>

                <p>
                  For increased security, each access link can be additionally
                  protected with a password.{" "}
                </p>
              </div>

              <div className="h-[10rem]  w-1/2 p-[5%]">
                <Image
                  alt=""
                  src="/Canva/4.png"
                  height={100}
                  width={500}
                  className=" mt-8"
                />
              </div>

              <div className="h-[13rem]  w-1/2 p-[5%]">
                <Image alt="" src="/Canva/9.png" height={100} width={500} />
              </div>

              <div className=" w-1/2 p-[5%] text-[#537185] h-[19rem] mt-14 flex justify-center items-center">
                <div>
                  <h2 className=" text-3xl text-[#283A4D] mb-6">
                    Timetable Exclusively For Schools{" "}
                  </h2>
                  <p>
                    Schools can share their timetable with all stakeholders,
                    such as parents, teachers, and students seamlessly. All
                    changes are updated in real time.{" "}
                  </p>
                </div>
              </div>

              <div className=" w-1/2 p-[5%]  text-[#537185] h-[90%] flex justify-center items-center mt-20">
                <div>
                  <h2 className=" text-3xl text-[#283A4D] mb-6">
                    Select your view- School, teacher or grade{" "}
                  </h2>
                  <p>
                    Principals and School admins can see the complete timetable
                    of the school, or if they wish they can see it gradwise or
                    teacher wise. Changes are reflected in real time on
                    everyone&apos;s timetable.
                  </p>
                </div>
              </div>

              <div className="h-[90%] mt-20 w-1/2 p-[5%] pt-0">
                <Image alt="" src="/Canva/7.png" height={100} width={500} />
              </div>
            </div>

            <div className=" pl-[10%] pr-[10%] h-[35rem] w-full bg-[#283A4D] text-white flex justify-center items-center flex-col">
              <h1 className=" text-[2.5rem] ">Wide range of applications</h1>
              <div className=" h-1 w-12 rounded m-8 bg-white"></div>
              <div className=" flex font-bold mt-8">
                <div className=" mr-20">
                  <ul>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Team timetable{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Family timetable{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Company timetable{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Practice timetable{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Club timetable{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Integration into website{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      <a className=" underline" href="/c/info-monitor">
                        Display on info monitor
                      </a>
                    </li>
                  </ul>
                </div>{" "}
                <div className=" ml-20">
                  <ul>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Personal timetable{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Holiday planning{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Timetable{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Riding stable planning{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Room planning{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      Duty roster{" "}
                    </li>
                    <li className="flex">
                      <svg
                        className="fill-current text-[#536789] mr-4 "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        width="30"
                        height="30"
                      >
                        <path d="M7.629 14.571L3.357 10.3a1 1 0 0 1 1.414-1.414l2.858 2.857 5.657-5.657a1 1 0 1 1 1.414 1.414l-6.071 6.071a1 1 0 0 1-1.414 0z" />
                      </svg>
                      School timetable{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pl-[10%] pr-[10%] h-full flex flex-wrap">
              <div className="flex justify-center items-center w-1/2 p-[5%] h-fit mt-14 mb-10">
                <Image src="/Canva/12.png" alt="" width={500} height={500} />
              </div>

              <div className=" w-1/2 p-[5%] text-[#53657D] h-fit mt-14 mb-10 ">
                <h2 className=" text-3xl text-[#283A4D] mb-6">
                  Never miss an event again{" "}
                </h2>
                <p>
                  Get reminders of your appointments via{" "}
                  <b className="text-[#273F59]">email</b> or{" "}
                  <b className="text-[#273F59]">SMS</b>. You also have the
                  option to send reminders to your team and family members.
                  <br />
                  <br />
                  You can receive daily or weekly agenda reminders so that you
                  can stay informed by email about upcoming events.
                  <br />
                  <br />
                  Additionally, you can receive notifications about new events
                  or event changes by email.{" "}
                </p>
              </div>

              <div className=" w-full h-[1px] bg-[#dbdbdb]"></div>
            </div>

            <CreateCalendar />

            <div
              id="register"
              className=" bg-[#283A4D] h-[40rem] w-[100%] flex justify-center items-center  "
            >
              <form
                onSubmit={handleCreateCalendarFormSubmit}
                className=" h-[28rem] w-[28rem] bg-white rounded flex flex-col items-center p-[3%] "
              >
                <h2 className=" text-3xl text-[#283A4D] mb-6  ">
                  Create timetable
                </h2>
                <div className=" w-14 h-1 bg-[#283A4D] rounded mb-6 "></div>
                <input
                  placeholder="Calendar name(optional)"
                  defaultValue={"My School Timetable"}
                  name="calendar_name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className=" h-14 p-4 outline-[#BFDEFF] rounded w-[100%] border border-[#0000001a] m-2 "
                />
                <input
                  placeholder="E-mail address"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className=" h-14 p-4 m-2 outline-[#BFDEFF] rounded w-[100%] border border-[#0000001a] "
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className=" h-14 p-4 m-4 rounded w-[100%] border border-[#5575A7] text-[#5575A7] hover:bg-[#5575A7] hover:text-white "
                >
                  {isLoading ? "Creating..." : "Create Free"}
                </button>
                <Link href={"#"}>Forgot your access link?</Link>
              </form>
            </div>
          </main>
        )}
      </>
      {/* <>
        <LandingPageComponent />
      </> */}
    </>
  );
}
