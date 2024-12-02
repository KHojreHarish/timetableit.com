export interface calendarData {
  eventIds: [];
  subcalendars: [];
  calendarIds?: [];
  identifier: string;
  title: string;
  id: string;
  accessLevel?: string;
  accessName?: string;
  isProtected?: boolean;
  password?: string;
  isActive: string;
  type: string;
}

export type CustomToolbarProps = {
  setisSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  Events: any;
};
export interface SubCalendar {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  isVisible: boolean;
}
export interface CreateSubCalendarProps {
  id: string;
  name: string;
  color: string;
  isVisible: boolean;
  isActive: boolean;
  onSubmit: (subCalendar: SubCalendar) => void;
}
export interface Event {
  id: string;
  title: string;
  description: string;
  allDay: boolean;
  repeatValue: "daily" | "weekly" | "monthly" | "yearly" | "never";
  repetitionCount?: number;
  repetitionUntil?: Date;
  start: Date;
  end: Date;
  subCalendarId: string[];
  refId?: string;
}
export interface AddEventProps {
  startDate: Date;
  endDate: Date;
  subCalendars: SubCalendar[];
  onSubmit: (event: Event) => void;
}
export type ViewTypes =
  | "month"
  | "week"
  | "work_week"
  | "day"
  | "agenda"
  | "year";

export interface CreateClassProps {
  isDialogOpen: boolean; // Whether the modal is open or not
  setIsDialogOpen: (open: boolean) => void; // Function to control modal visibility
  subTimetables: { id: string; name: string; color: string }[]; // List of subtimetables
  timetableId: string; // ID of the current timetable
  mode?: "create" | "update" | "view"; // The mode for the modal (create, update, or view)
  eventData?: {
    title: string;
    teacher: string;
    description: string;
    start: Date;
    end: Date;
    isAllDay: boolean;
    subTimetable: string;
  }; // Event data for updating (if in update mode)
}

export interface CreateClassType {
  title: string;
  teacher: string;
  description: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
  subTimetable: string;
}

export interface EventData {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  recurrencePattern: string;
  count?: number;
}

export interface rruleType {
  count?: number | undefined;
  dtstart: Date;
  until?: Date;
}
