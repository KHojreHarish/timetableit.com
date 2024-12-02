import ClassFormModal from "@/app/(calendar)/c/[id]/_components/ClassFormModal";
import Sidebar from "@/app/(calendar)/c/[id]/_components/Sidebar";
import Toolbar from "@/app/(calendar)/c/[id]/_components/Toolbar";
import { Button, Image } from "@nextui-org/react";
import { LinkIcon, Settings } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { View } from "react-big-calendar";
import Calendar from "./Calendar";
import { toast } from "sonner";

// Props Interface
interface CalendarUiProps {
  TimetableData: {
    timetable: any;
    subtimetables: any[];
  };
  timetableId: string;
}

const CalendarUi: React.FC<CalendarUiProps> = ({
  TimetableData,
  timetableId,
}) => {
  const router = useRouter();

  // States
  const [events, setEvents] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const [isUpdateEventDialogOpen, setIsUpdateEventDialogOpen] = useState(false);
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tempEventData, setTempEventData] = useState<any>();
  const [subtimetables, setSubtimetables] = useState<any[]>(
    TimetableData.subtimetables
  );
  const [accessLevel] = useState(TimetableData.timetable.role);

  /**
   * Memoized function that determines if the current user has the ability to
   * create events in the current timetable.
   *
   * @returns {boolean} `true` if the user can create events, `false` otherwise
   */
  const canCreateEvent = useMemo(() => {
    if (accessLevel === "specific") {
      return subtimetables.some(
        (sub) => sub.role === "admin" || sub.role === "modifier"
      );
    }
    return accessLevel !== "reader";
  }, [subtimetables, accessLevel]);

  /**
   * Handles navigation (prev/next/today) for the calendar.
   */
  const handleNavigate = useCallback(
    (action: string, view: string) => {
      const actionsMap: any = {
        prev: { day: -1, week: -1, month: -1, year: -1 },
        next: { day: 1, week: 1, month: 1, year: 1 },
      };
      if (action in actionsMap) {
        const unit = view === "agenda" ? "day" : view;
        setCurrentDate(
          moment(currentDate).add(actionsMap[action][unit], unit).toDate()
        );
      } else if (action === "today") {
        setCurrentDate(new Date());
      }
    },
    [currentDate]
  );

  /**
   * Triggered when a slot is selected on the calendar.
   */
  const handleSelectSlot = useCallback(
    (slotInfo: any) => {
      if (accessLevel !== "reader") {
        setTempEventData({
          subject: "",
          teacher: "",
          description: "",
          isAllDay: false,
          subTimetable: "",
          start: slotInfo.start,
          end: slotInfo.end,
        });
        setIsCreateEventDialogOpen(true);
      }
    },
    [accessLevel]
  );

  const handleSelectEvent = useCallback(async (event: any) => {
    setTempEventData(event);
    setIsUpdateEventDialogOpen(true);
  }, []);

  // Style customization for calendar events
  const eventPropGetter = useCallback(
    (event: any) => ({
      style: {
        backgroundColor: event.color || "#3182CE",
      },
    }),
    []
  );

  const renderHeader = () => (
    <div className="h-[3rem] border-b-[0.5px] border-[#d9d9d9] flex justify-between items-center p-[1%]">
      <div className="flex w-[30rem] justify-between">
        <Image
          src="/Logo.png"
          alt="Online Timetable Logo"
          width={200}
          height={200}
          className="hidden mdplus:flex max-h-full mt-1"
          loading="lazy"
        />
        <h1 className="text-2xl m-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {TimetableData.timetable.name || "My Timetable"}
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <h3 className="flex text-xl">
          <LinkIcon />
          <i className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {TimetableData.timetable.role || "Administrator"}
          </i>
        </h3>
        {accessLevel === "admin" && (
          <Button
            onClick={() => router.push(`${timetableId}/settings`)}
            variant="light"
            isIconOnly
            className="-mr-3"
          >
            <Settings className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-[#FAFAFA] overflow-hidden">
      {renderHeader()}
      <main className="flex justify-center">
        <Sidebar
          setEvents={setEvents}
          calendarId={timetableId}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          subTimetableData={subtimetables}
          accessLevel={accessLevel}
        />
        <div className="flex flex-col min-h-[100%] w-full">
          <Toolbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            view={view}
            setView={setView}
            handleNavigate={handleNavigate}
          />
          <div className="h-[83vh]">
            <Calendar
              events={events}
              toolbar={false}
              startAccessor="start"
              endAccessor="end"
              view={view as View}
              date={currentDate}
              views={{ day: true, month: true, week: true, agenda: true }}
              selectable
              popup
              longPressThreshold={500}
              onSelectSlot={canCreateEvent ? handleSelectSlot : null}
              onSelectEvent={handleSelectEvent}
              eventPropGetter={eventPropGetter}
            />
          </div>
        </div>
      </main>
      {isCreateEventDialogOpen && (
        <ClassFormModal
          isDialogOpen={isCreateEventDialogOpen}
          setIsDialogOpen={setIsCreateEventDialogOpen}
          subTimetables={subtimetables}
          eventData={tempEventData}
          mode="create"
          timetableId={timetableId}
        />
      )}
      {isUpdateEventDialogOpen && (
        <ClassFormModal
          isDialogOpen={isUpdateEventDialogOpen}
          setIsDialogOpen={setIsUpdateEventDialogOpen}
          subTimetables={subtimetables}
          eventData={tempEventData}
          mode="update"
          timetableId={timetableId}
        />
      )}
    </div>
  );
};

export default CalendarUi;
