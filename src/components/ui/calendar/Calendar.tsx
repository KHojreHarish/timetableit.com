// "use client";
// import { Event } from "@/types/calendarTypes";
// import { Select, SelectItem, SelectedItems } from "@nextui-org/select";
// import moment from "moment-timezone";
// import { Exo_2 } from "next/font/google";
// import { useEffect, useState } from "react";
// import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import { toast } from "sonner";

// // fonts
// const exo = Exo_2({ subsets: ["latin"], weight: "500" });

// const DnDCalendar = withDragAndDrop<Event, any>(BigCalendar);
// const localizer = momentLocalizer(moment);

// const customLocalizer = (selectedTimezone: string) =>
//   momentLocalizer(selectedTimezone ? moment.tz(selectedTimezone) : moment);

// const TimezoneSelector = ({ onTimezoneChange }: { onTimezoneChange: any }) => {
//   const [selectedTimezone, setSelectedTimezone] = useState<any>();

//   useEffect(() => {
//     if (navigator && navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const coords = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };
//           setSelectedTimezone(moment.tz.guess());
//         },
//         (error) => {
//           toast.warning(
//             "Timezone will be <b>Asia/calcutta</b>, since you denied location permission."
//           );
//         }
//       );
//     }
//   }, []);
//   const handleTimezoneChange = (event: any) => {
//     setSelectedTimezone(event.target.value);
//     onTimezoneChange(event.target.value); // Pass selection to parent component
//   };

//   const availableTimezones = moment.tz.names(); // Get available timezones

//   return (
//     <Select
//       label="Select Timezone"
//       items={availableTimezones}
//       className="max-w-xs fixed bottom-0"
//       variant="bordered"
//       defaultSelectedKeys={""}
//       renderValue={(items: SelectedItems<any>) => {
//         return (
//           <div className="flex flex-wrap gap-2">
//             {items.map((item: any) => item.textValue)}
//           </div>
//         );
//       }}
//     >
//       {availableTimezones.map((timezone) => (
//         <SelectItem key={timezone} value={timezone}>
//           {timezone}
//         </SelectItem>
//       ))}
//     </Select>
//   );
// };

// const Calendar = (props: any) => {
//   const [selectedTimezone, setSelectedTimezone] = useState("");

//   const handleTimezoneChange = (newTimezone: string) => {
//     setSelectedTimezone(newTimezone);
//   };

//   return (
// <>
//   <DnDCalendar localizer={localizer} className={exo.className} {...props} />
//   {/* <TimezoneSelector onTimezoneChange={handleTimezoneChange} /> */}
// </>
//   );
// };

// export default Calendar;

"use client";
import { Event } from "@/types/calendarTypes";
import moment from "moment-timezone";
import { Exo_2 } from "next/font/google";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

// fonts
const exo = Exo_2({ subsets: ["latin"], weight: "500" });

const DnDCalendar = withDragAndDrop<Event, any>(BigCalendar);
const localizer = momentLocalizer(moment);

const Calendar = (props: any) => {
  return (
    <>
      <DnDCalendar
        localizer={localizer}
        className={`${exo.className} rounded-xl`}
        {...props}
      />
    </>
  );
};

export default Calendar;
