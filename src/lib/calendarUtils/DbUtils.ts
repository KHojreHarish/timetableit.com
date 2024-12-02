import { Event } from "@/types/calendarTypes";
import axios from "axios";
import { toast } from "sonner";

export const getSubcalendars = async (calendarId: string) => {
  try {
    await axios
      .post("/api/v1/find/allsubcalendars", { calendarId })
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          return response;
        } else {
          toast.error("something went wrong");
        }
      });
  } catch (error: any) {
    toast.error("something went wrong");
  }
};
export const createEvent = async (event: Event, calendarId: string) => {
  try {
    await axios
      .post("/api/v1/create/event", {
        eventData: event,
        timetableId: calendarId,
      })
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          toast.success(" new event created succesfully");
        } else {
          toast.error("something went wrong");
        }
      });
  } catch (error: any) {
    toast.error("something went wrong");
  }
};

export const createEvents = async (event: Event, calendarId: string) => {
  try {
    await axios
      .post("/api/v1/create/events", { eventData: event, calendarId })
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          toast.success(" new event created succesfully");
        } else {
          toast.error("something went wrong");
        }
      });
  } catch (error: any) {
    toast.error("something went wrong");
  }
};
export const updateEvent = async (event: Event, calendarId: string) => {
  try {
    await axios
      .post("/api/v1/update/event", {
        eventData: event,
        timetableId: calendarId,
      })
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          toast.success("event updated succesfully");
        } else {
          toast.error("something went wrong");
        }
      });
  } catch (error: any) {
    toast.error("something went wrong");
  }
};
export const deleteEvents = async (refId: Event, calendarId: string) => {
  try {
    await axios
      .post("/api/v1/delete/events", { refId, calendarId })
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          toast.success("event(s) deleted succesfully");
        } else {
          toast.error("something went wrong");
        }
      });
  } catch (error: any) {
    toast.error("something went wrong");
  }
};
export const deleteEvent = async (eventId: Event, calendarId: string) => {
  try {
    await axios
      .post("/api/v1/delete/event", { eventId, calendarId })
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          toast.success("event deleted succesfully");
        } else {
          toast.error("something went wrong");
        }
      });
  } catch (error: any) {
    toast.error("something went wrong");
  }
};
