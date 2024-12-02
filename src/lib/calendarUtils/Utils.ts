import { Event } from "@/types/calendarTypes";
import { RRule } from "rrule";

export const getEventColor = (event: Event, colors: string[]) => {
  if (!event.subCalendarId?.length) return "gray";
  const numSubCalendars = event.subCalendarId.length;

  // Calculate gradient stops based on number of sub calendars
  const stops = colors.map(
    (color, index) => `${color} ${((index + 1) / (numSubCalendars + 1)) * 100}%`
  );

  return `linear-gradient(to right, ${stops.join(", ")})`;
};

export const filterEvents = (
  allEvents: Event[],
  selectedSubCalendarIds: string[],
  showAllSubCalendars: boolean
) => {
  if (showAllSubCalendars) {
    return allEvents; // Show all events if master is checked
  }
  return allEvents.filter((event) =>
    selectedSubCalendarIds.includes(event.subCalendarId?.[0] || "")
  );
};

type RecurrencePattern = "daily" | "weekly" | "monthly" | "yearly";

export function getRecurrenceRule(pattern: RecurrencePattern) {
  switch (pattern) {
    case "daily":
      return { freq: RRule.DAILY };
    case "weekly":
      return { freq: RRule.WEEKLY };
    case "monthly":
      return { freq: RRule.MONTHLY };
    case "yearly":
      return { freq: RRule.YEARLY };
    default:
      console.warn(`Unsupported recurrence pattern: ${pattern}`);
      return null;
  }
}
