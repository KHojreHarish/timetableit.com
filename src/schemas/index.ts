import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(
      8,

      { message: "Password shoud be minimum of 8 characters" }
    )
    .max(15, "Password can be of maximum 15 characters."),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const SignupSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Name can not contain more than 30 character(s)"),
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(
      8,

      { message: "Password shoud be minimum of 8 characters" }
    )
    .max(15, "Password can be of maximum 15 characters."),
});

export type SignupType = z.infer<typeof SignupSchema>;

export const OtpSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

export type OtpType = z.infer<typeof OtpSchema>;

export const CreateTimetableSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(30, "Title can not contain more than 30 character(s)"),
  user: z.any(),
});

export type CreateTimetableType = z.infer<typeof CreateTimetableSchema>;

export const SearchUserSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  role: z.enum(["reader", "admin", "specific", "modifier"]),
  roles: z.any().optional(),
  timetableId: z.string().optional(),
});

export type SearchUserType = z.infer<typeof SearchUserSchema>;

// Timetable Schemas
// Event schema
const EventSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  start: z.string(), // ISO date string for the start time
  end: z.string(), // ISO date string for the end time
  allDay: z.boolean().optional(),
  repeatValue: z
    .enum(["never", "daily", "weekly", "monthly", "yearly"])
    .default("never"),
});
export type EventType = z.infer<typeof EventSchema>;

// Subtimetable schema
const SubTimetableSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string(), // Assuming it’s a hex color
  isVisible: z.boolean(),
  createdAt: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  updatedAt: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  events: z.array(EventSchema), // Events reside inside each subtimetable
});

export type SubtimetableType = z.infer<typeof SubTimetableSchema>;

// SharedWith schema
const SharedWithSchema = z.object({
  userId: z.string(), // The ID of the user shared with
  role: z.enum(["admin", "modifier", "reader"]),
  subtimetableRoles: z
    .record(z.string(), z.enum(["admin", "modifier", "reader"]))
    .optional(),
  sharedAt: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
});

export type SharedWithType = z.infer<typeof SharedWithSchema>;

// Main Timetable schema
const TimetableSchema = z.object({
  viewEndTime: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  accessName: z.string(),
  timeZone: z.string(),
  language: z.string(),
  title: z.string(),
  isActive: z.boolean(),
  viewStartTime: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  showDetailInListView: z.boolean(),
  isBrandingVisible: z.boolean(),
  createdAt: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  updatedAt: z.object({
    _seconds: z.number(),
    _nanoseconds: z.number(),
  }),
  password: z.string().optional(),
  groupListViewBy: z.enum(["month", "week", "day"]),
  defaultView: z.enum(["month", "week", "day"]),
  isProtected: z.boolean(),
  timeStep: z.number(),
  createdBy: z.string(), // Typically the creator's email
  firstDayOfWeek: z.enum(["monday", "sunday"]),
  hideWeekend: z.boolean(),
  listViewPeriod: z.enum(["one-day", "one-week", "one-month"]),
  subtimetables: z.array(SubTimetableSchema), // Array of subtimetables
  sharedWith: z.array(SharedWithSchema).optional(), // Array of shared users
});

export type TimetableType = z.infer<typeof TimetableSchema>;

export const CreateClassSchema = z.object({
  title: z.string().min(1, "Please select the subject"),
  teacher: z.string().min(1, "Please select the teacher"),
  description: z.string().optional(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  isAllDay: z.any(),
  // repeatValue: z.enum([
  //   "never",
  //   "daily",
  //   "weekly",
  //   "monthly",
  //   "quarterly",
  //   "yearly",
  // ]),
  // repetitionCount: z.number().optional(),
  // repetitionUntil: z.date().optional(),
  subTimetable: z.string().min(1, "Please select the subTimetable"),
  id: z.string().optional(),
});

export type CreateClassType = z.infer<typeof CreateClassSchema>;

export const CreateSubTimetableSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(50, { message: "Title must not exceed 50 characters" }),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code",
  }),
  description: z.string().optional(),
});

export type CreateSubTimetableType = z.infer<typeof CreateSubTimetableSchema>;
