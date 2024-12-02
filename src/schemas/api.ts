import {
  DocumentData,
  DocumentReference,
  Firestore,
} from "firebase-admin/firestore";

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  description: string;
  repeatValue: string;
}

export interface Subtimetable {
  id: string;
  name: string;
  color: string;
  isVisible: boolean;
  role: "admin" | "modifier" | "reader";
  events: Event[];
}

export interface SharedWith {
  userId: string;
  role: "admin" | "modifier" | "reader";
  subtimetablesRoles: Record<string, "admin" | "modifier" | "reader">;
  sharedAt: string;
}

export interface Timetable {
  title: string;
  createdBy: string;
  timeZone: string;
  defaultView: string;
  isProtected: boolean;
  createdAt: string;
  updatedAt: string;
  subtimetables: Subtimetable[];
  role?: "admin" | "modifier" | "reader";
}
