"use client";
import { auth } from "@/app/firebaseConfig";
import CalendarNotFound from "@/components/CalendarNotFound";
import CalendarUi from "@/components/ui/calendar/CalendarUi";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { LockIcon, MailIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const mockData = {
  timetable: {
    id: "timetable1",
    name: "Project Timeline",
    role: "admin", // User's main role in the timetable
    description: "Overall project plan and timelines",
  },
  subtimetables: [
    {
      id: "sub1",
      name: "Development Schedule",
      role: "modifier", // User's specific role for this subtimetable
      isVisible: true,
      color: "#0000FF",
      events: [
        {
          id: "event1",
          title: "Frontend Setup",
          start: "2024-11-01T09:00:00Z",
          end: "2024-11-01T12:00:00Z",
          role: "reader",
          color: "#0000FF", // Inherits color from subtimetable
        },
        {
          id: "event2",
          title: "Backend Integration",
          start: "2024-11-05T13:00:00Z",
          end: "2024-11-05T17:00:00Z",
          role: "modifier",
          color: "#0000FF",
        },
      ],
    },
    {
      id: "sub2",
      name: "Testing Schedule",
      role: "reader",
      isVisible: false,
      color: "#FF0000",
      events: [
        {
          id: "event3",
          title: "Unit Testing",
          start: "2024-11-10T10:00:00Z",
          end: "2024-11-10T15:00:00Z",
          role: "reader",
          color: "#FF0000",
        },
        {
          id: "event4",
          title: "Integration Testing",
          start: "2024-11-12T10:00:00Z",
          end: "2024-11-12T16:00:00Z",
          role: "modifier",
          color: "#FF0000",
        },
      ],
    },
    {
      id: "sub3",
      name: "Deployment Schedule",
      role: "admin",
      isVisible: true,
      color: "#dadada",
      events: [
        {
          id: "event5",
          title: "Staging Deployment",
          start: "2024-11-15T11:00:00Z",
          end: "2024-11-15T14:00:00Z",
          role: "admin",
          color: "#dadada",
        },
        {
          id: "event6",
          title: "Production Deployment",
          start: "2024-11-20T10:00:00Z",
          end: "2024-11-20T14:00:00Z",
          role: "admin",
          color: "#dadada",
        },
      ],
    },
  ],
};

const TimetablePage = ({ params }: { params: { id: string } }) => {
  const timetableId = params.id;

  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const { data, isPending, error, isPaused } = useQuery({
    queryKey: ["timetable", timetableId],
    queryFn: async () => {
      // Send GET request to fetch all sub-timetables
      const response = await fetch(
        `/api/v1/fetch/timetable?timetableId=${timetableId}&&userId=${userId}`
      );
      return await response.json();
    },
    enabled: !!timetableId && !!userId,
  });
  return (
    <>
      {isPending ? (
        <Card className=" flex flex-col w-full h-screen max-h-full">
          <Skeleton className=" max-h-full p-4 border-2 m-2 rounded "></Skeleton>
          <div className=" flex h-screen ">
            <Skeleton className=" w-[13rem] max-h-full p-4 border-2 m-2 rounded "></Skeleton>{" "}
            <Skeleton className=" w-full max-h-full p-4 border-2 m-2 rounded "></Skeleton>{" "}
          </div>
        </Card>
      ) : data && data.success ? (
        <CalendarUi TimetableData={data} timetableId={timetableId} />
      ) : data.message === "Timetable not found" ? (
        <CalendarNotFound />
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center flex flex-col items-center ">
              <div className="w-20 h-20 mx-auto mb-4 text-yellow-500">
                <LockIcon className="w-full h-full" />
              </div>
              <CardTitle className="text-2xl font-bold">
                No Access to Timetable
              </CardTitle>
              <CardDescription>
                We&apos;re sorry, but you don&apos;t have permission to view
                this timetable.
              </CardDescription>
            </CardHeader>
            <CardBody className="space-y-4">
              <p className="text-sm text-gray-600">
                This could be due to one of the following reasons:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Your account hasn&apos;t been granted access yet</li>
                <li>Your access has expired</li>
                <li>There might be an issue with your account</li>
              </ul>
            </CardBody>
            <CardFooter className="flex flex-col space-y-2">
              <RequestAccessButton email={data.timetable.createdBy} />
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};
const RequestAccessButton = ({ email }: { email: string }) => {
  const subject = encodeURIComponent("Request for Access");
  const body = encodeURIComponent(
    "Hello,\n\nI would like to request access to the timetable.\n\nThank you!"
  );

  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <button
      onClick={() => (window.location.href = mailtoLink)}
      className=" flex  items-center justify-center bg-blue-500 text-white py-2 px-4 rounded"
    >
      <MailIcon className="mr-2 h-4 w-4" /> Request Access
    </button>
  );
};
export default TimetablePage;
// "use client";
// import { auth } from "@/app/firebaseConfig";
// import CalendarUi from "@/components/ui/calendar/CalendarUi";
// import { CardDescription, CardTitle } from "@/components/ui/card";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   CardHeader,
//   Skeleton,
// } from "@nextui-org/react";
// import { useQuery } from "@tanstack/react-query";
// import { onAuthStateChanged } from "firebase/auth";
// import { LockIcon, MailIcon } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const TimetablePage = ({ params }: { params: { id: string } }) => {
//   const router = useRouter();
//   const [user, setUser] = useState<any>(null);
//   const [userRole, setUserRole] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         setUser(null); // User is not logged in
//         router.push("/login");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const timetableQuery = useQuery({
//     queryKey: ["timetable", params.id],
//     queryFn: async () => {
//       const response = await fetch(
//         `/api/v1/fetch/timetable?timetableId=${params.id}&&userId=${user.uid}`
//       );
//       const data = await response.json();
//       return data;
//     },
//     refetchOnWindowFocus: false,
//     enabled: !!params.id && !!user, // Only fetch if timetableId and user are available
//   });

//   return (
//     <>
//       {timetableQuery.isLoading ? (
//         <Card className=" flex flex-col w-full h-screen max-h-full">
//           <Skeleton className=" max-h-full p-4 border-2 m-2 rounded "></Skeleton>
//           <div className=" flex h-screen ">
//             <Skeleton className=" w-[13rem] max-h-full p-4 border-2 m-2 rounded "></Skeleton>
//             <Skeleton className=" w-full max-h-full p-4 border-2 m-2 rounded "></Skeleton>
//           </div>
//         </Card>
//       ) : (
//         timetableQuery.data &&
//         userRole &&
//         (userRole === "none" ? (
//           <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//             <Card className="max-w-md w-full">
//               <CardHeader className="text-center flex flex-col items-center ">
//                 <div className="w-20 h-20 mx-auto mb-4 text-yellow-500">
//                   <LockIcon className="w-full h-full" />
//                 </div>
//                 <CardTitle className="text-2xl font-bold">
//                   No Access to Timetable
//                 </CardTitle>
//                 <CardDescription>
//                   We're sorry, but you don't have permission to view this
//                   timetable.
//                 </CardDescription>
//               </CardHeader>
//               <CardBody className="space-y-4">
//                 <p className="text-sm text-gray-600">
//                   This could be due to one of the following reasons:
//                 </p>
//                 <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//                   <li>Your account hasn't been granted access yet</li>
//                   <li>Your access has expired</li>
//                   <li>There might be an issue with your account</li>
//                 </ul>
//               </CardBody>
//               <CardFooter className="flex flex-col space-y-2">
//                 <RequestAccessButton
//                   email={timetableQuery.data.timetable.createdBy}
//                 />
//               </CardFooter>
//             </Card>
//           </div>
//         ) : (
//           // <CalendarUi
//           //   calendarData={timetableQuery.data.timetable}
//           //   subCalendarData={timetableQuery.data.subtimetable}
//           //   eventsData={timetableQuery.data.events}
//           //   calendarId={params.id}
//           //   userRole={userRole} // Pass the user's role to the UI component
//           // />
//           "sdfdf"
//         ))
//       )}
//     </>
//   );
// };

// export default TimetablePage;

// "use client";

// import CalendarNotFound from "@/components/CalendarNotFound";
// import CalendarUi from "@/components/ui/calendar/CalendarUi";
// import { Event, SubCalendar, calendarData } from "@/types/calendarTypes";
// import {
//   Button,
//   Card,
//   Checkbox,
//   Input,
//   Link,
//   Skeleton,
// } from "@nextui-org/react";
// import axios from "axios";
// import { Eye, EyeOffIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// // const calendars = [
// //   {
// //     id: "12345679",
// //     email: "harish@gmail.com",
// //     name: "Calendar 2",
// //     subCalendars: [
// //       {
// //         id: "yoivmghah6c1kyxk8mor",
// //         name: "Moksh",
// //         color: "#FF0000",
// //         isVisible: true,
// //       },
// //       {
// //         id: "fpz6pc0gpxk14vxc2ceb",
// //         name: "Paul",
// //         color: "#5A7",
// //         isVisible: true,
// //       },
// //     ],
// //     events: [
// //       {
// //         description: "dsfdsdf",
// //         end: new Date(),
// //         id: "c3rchjwwunhnmrk2s23q",
// //         isAllDay: false,
// //         repeatValue: "never",
// //         start: new Date(),
// //         subCalendarId: ["yoivmghah6c1kyxk8mor", "fpz6pc0gpxk14vxc2ceb"],
// //         title: "My Event",
// //       },
// //     ],
// //     links: [
// //       { id: "123456", acces_level: "Reader" },
// //       { id: "123455", acces_level: "Administrator" },
// //     ],
// //   },
// //   {
// //     id: "12345678",
// //     email: "harish@gmail.com",
// //     name: "Calendar 1",
// //     subCalendars: [
// //       {
// //         id: "yoivmghah6c1kyxk8mor",
// //         name: "Moksh",
// //         color: "#FF0000",
// //         isVisible: true,
// //       },
// //       {
// //         id: "fpz6pc0gpxk14vxc2ceb",
// //         name: "Paul",
// //         color: "#5456A7",
// //         isVisible: true,
// //       },
// //     ],
// //     events: [
// //       {
// //         description: "dsfdsdf",
// //         end: new Date(),
// //         id: "c3rchjwwunhnmrk2s23q",
// //         isAllDay: false,
// //         repeatValue: "never",
// //         start: new Date(),
// //         subCalendarId: ["yoivmghah6c1kyxk8mor", "fpz6pc0gpxk14vxc2ceb"],
// //         title: "My Event",
// //       },
// //     ],
// //   },
// // ];

// const CreateCalendarPage = ({ params }: { params: { id: string } }) => {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [calendarData, setCalendarData] = useState<calendarData>();
//   const [subCalendarData, setSubCalendarData] = useState<SubCalendar>();
//   const [events, setEvents] = useState<Event[]>([]);
//   let calendarId = params.id;

//   const [authorized, setAuthorized] = useState<boolean>(true);
//   const [shouldRememeber, setShouldRemember] = useState<boolean>();
//   const [isPassVisible, setIsPassVisible] = useState(false);
//   const [enteredPass, SetEnteredPass] = useState("");

//   const handlePassCheck = (password: string | undefined) => {
//     if (password === enteredPass) {
//       setAuthorized(false);
//       shouldRememeber ? localStorage.setItem("authorized", "false") : null;
//       toast.success("welcome!");
//     } else {
//       setAuthorized(true);
//       toast.warning("please enter correct password");
//     }
//   };

//   const getEvents = async (eventIds: string[]) => {
//     await axios
//       .post(`/api/v1/find/allevents`, {
//         eventIds,
//       })
//       .then((eventResponse) => {
//         eventResponse.data.data.forEach((event: Event) => {
//           setEvents((prevState) => [
//             ...prevState,
//             {
//               id: event.id,
//               description: event.description,
//               end: new Date(event.end),
//               start: new Date(event.start),
//               repeatValue: event.repeatValue,
//               allDay: event.allDay,
//               subCalendarId: event.subCalendarId,
//               title: event.title,
//               repetitionCount: event.repetitionCount,
//               repetitionUntil: event.repetitionUntil,
//               refId: event.refId,
//             },
//           ]);
//         });
//       });
//   };

//   useEffect(() => {
//     const storedValue = localStorage.getItem("authorized");
//     if (storedValue !== null) {
//       setAuthorized(false);
//     }

//     const calendar = async () => {
//       try {
//         await axios
//           .get(`/api/v1/find/calendar?id=${calendarId}`)
//           .then(async (response) => {
//             if (response.data.success && response.status === 200) {
//               if (response.data.data.calendar.type === "child") {
//                 // eslint-disable-next-line react-hooks/exhaustive-deps
//                 calendarId = response.data.data.calendar.parentId;
//                 await axios
//                   .get(
//                     `/api/v1/find/calendar?id=${response.data.data.calendar.parentId}`
//                   )
//                   .then(async (parentResponse) => {
//                     const {
//                       accessLevel,
//                       accessName,
//                       isActive,
//                       password,
//                       isProtected,
//                       type,
//                     } = response.data.data.calendar;
//                     const newCalendarData = {
//                       ...parentResponse.data.data.calendar,
//                     };

//                     newCalendarData.accessName = accessName;
//                     newCalendarData.accessLevel = accessLevel;
//                     newCalendarData.isActive = isActive;
//                     newCalendarData.password = password;
//                     newCalendarData.isProtected = isProtected;
//                     newCalendarData.type = type;

//                     setCalendarData(newCalendarData);
//                     setSubCalendarData(parentResponse.data.data.subCalendar);
//                     getEvents(parentResponse.data.data.calendar.eventIds);
//                     if (storedValue === null) {
//                       setAuthorized(newCalendarData.isProtected);
//                     }
//                   });
//               } else if (response.data.data.calendar.type !== "child") {
//                 setCalendarData(response.data.data.calendar);
//                 setSubCalendarData(response.data.data.subCalendar);
//                 getEvents(response.data.data.calendar.eventIds);
//                 if (storedValue === null) {
//                   setAuthorized(response.data.data.calendar.isProtected);
//                 }
//               }
//             } else {
//               toast.error("something went wrong");
//             }
//           });

//         setIsLoading(false);
//       } catch (error) {
//         toast.error("something went wrong");
//         setCalendarData(undefined);
//         setIsLoading(false);
//       }
//     };
//     calendar();
//   }, [calendarId]);

//   return (
//     <>
//       {isLoading === false ? (
//         calendarData !== undefined ? (
//           subCalendarData !== undefined &&
//           calendarData.eventIds.length === events.length &&
//           (authorized ? (
//             <div className=" h-screen w-[100vw] flex flex-col items-center justify-center ">
//               <Input
//                 label="Password required for this calendar:"
//                 labelPlacement="outside"
//                 variant="bordered"
//                 placeholder="Enter your password"
//                 value={enteredPass}
//                 onValueChange={(e) => SetEnteredPass(e)}
//                 endContent={
//                   <button
//                     className="focus:outline-none"
//                     type="button"
//                     onClick={() => setIsPassVisible(!isPassVisible)}
//                   >
//                     {isPassVisible ? (
//                       <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
//                     ) : (
//                       <Eye className="text-2xl text-default-400 pointer-events-none" />
//                     )}
//                   </button>
//                 }
//                 type={isPassVisible ? "text" : "password"}
//                 className="max-w-md"
//               />
//               <div className="flex-wrap flex py-2 px-1 gap-10 justify-between max-w-[30rem] ">
//                 <Checkbox
//                   classNames={{
//                     label: "text-small",
//                   }}
//                   onValueChange={(e) => setShouldRemember(e)}
//                 >
//                   Remember me
//                 </Checkbox>
//                 <Link color="primary" href="#" size="sm">
//                   Forgot password?
//                 </Link>
//               </div>
//               <Button
//                 variant="shadow"
//                 size="md"
//                 color="success"
//                 className=" m-6 font-bold  "
//                 onPress={() => handlePassCheck(calendarData.password)}
//               >
//                 Let&apos;s Go
//               </Button>
//             </div>
//           ) : (
//             <CalendarUi
//               calendarData={calendarData}
//               subCalendarData={subCalendarData}
//               eventsData={events}
//               calendarId={calendarId}
//             />
//           ))
//         ) : (
//           <CalendarNotFound />
//         )
//       ) : (
//         <Card className=" flex flex-col w-full h-screen max-h-full">
//           <Skeleton className=" max-h-full p-4 border-2 m-2 rounded "></Skeleton>
//           <div className=" flex h-screen ">
//             <Skeleton className=" w-[13rem] max-h-full p-4 border-2 m-2 rounded "></Skeleton>
//             <Skeleton className=" w-full max-h-full p-4 border-2 m-2 rounded "></Skeleton>
//           </div>
//         </Card>
//       )}
//     </>
//   );
// };

// export default CreateCalendarPage;
