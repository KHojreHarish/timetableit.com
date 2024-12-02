import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// creating the class event method
// export const createClassMutation = useMutation({
//   mutationKey: ["class"],
//   mutationFn: async ({
//     timetableId,
//     classData,
//   }: {
//     timetableId: string;
//     classData: any;
//   }) => {
//     const response = await fetch(`/api/v1/create/class`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(timetableId, classData),
//     });
//     return await response.json();
//   },
// });

/**
 * useCreateClass
 *
 * @description
 * Custom hook to handle the creation of a class associated with a specific timetable.
 * It uses a mutation to send a POST request to the server.
 *
 * @returns {{
 *  mutate: Function,
 *  isPending: boolean,
 *  error: any,
 *  isPaused: boolean
 * }} - An object containing the mutate function, status flags, and error information.
 */
export const useCreateClass = () => {
  // Destructure the mutation response to get the mutate function and status flags
  const { mutate, isPending, error, isPaused } = useMutation({
    // Unique key for the mutation
    mutationKey: ["createClass"],
    // Async function that executes the mutation
    mutationFn: async ({
      timetableId,
      classData,
    }: {
      timetableId: string;
      classData: any;
    }) => {
      // Send POST request to create a class
      const response = await fetch(`/api/v1/create/class`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Include the timetable ID and class data in the request body
        body: JSON.stringify({ timetableId, classData }),
      });
      // Return the JSON response
      return await response.json();
    },
  });

  return { mutate, isPending, error, isPaused };
};

/**
 * useCreateSubTimetableMutation
 *
 * @description
 * Creates a new sub-timetable and associates it with a specific timetable.
 * @param {string} timetableId - The ID of the timetable to associate the new sub-timetable with.
 * @param {object} subTimetableData - The data to create the new sub-timetable with.
 * @returns {{ mutate: Function, isPending: boolean, error: any, isPaused: boolean }} - An object containing the mutate function, a boolean indicating if the mutation is pending, the error of the mutation if it has failed, and a boolean indicating if the mutation is paused.
 */
export const useCreateSubTimetable = () => {
  const { mutate, isPending, error, isPaused } = useMutation({
    mutationKey: ["createSubTimetable"],
    mutationFn: async ({
      timetableId,
      subTimetableData,
    }: {
      timetableId: string;
      subTimetableData: any;
    }) => {
      const response = await fetch(`/api/v1/create/subtimetable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timetableId, subTimetableData }),
      });

      const data = await response.json();
      if (data.success) toast.success("Class created successfully");
      if (!data.success) toast.error("something went wrong");

      return data;
    },
  });

  return { mutate, isPending, error, isPaused };
};
