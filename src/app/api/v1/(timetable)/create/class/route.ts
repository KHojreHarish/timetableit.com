import admin from "@/app/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to create a new class (event) in a specified subtimetable.
 *
 * - Parses the incoming request body to extract the `timetableId` and `classData`.
 * - Validates the presence of `timetableId` and `classData`.
 * - Generates a new event document reference within the specified subtimetable.
 * - Sets the event data in Firestore with an auto-generated event ID and timestamp.
 * - Returns a JSON response indicating success or failure, along with the event data or error message.
 *
 */
export async function POST(req: NextRequest) {
  const { timetableId, classData } = await req.json();

  if (!timetableId || !classData) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const subTimetableId = classData.subTimetable;
  try {
    const db = admin.firestore();

    // Reference to the specific events subcollection for the sub-timetable
    const eventRef = db
      .collection("timetables")
      .doc(timetableId)
      .collection("subtimetables")
      .doc(subTimetableId)
      .collection("events")
      .doc(); // Generate the event document reference

    const eventId = eventRef.id; // Get the auto-generated event ID

    // Add event data to Firestore with the event ID included
    const eventData = {
      ...classData,
      id: eventId, // Include the ID in the event data
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await eventRef.set(eventData);

    return NextResponse.json(
      {
        success: true,
        message: "Class created successfully",
        event: eventData, // Return the created event data with the ID
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create class",
        error,
      },
      { status: 500 }
    );
  }
}
