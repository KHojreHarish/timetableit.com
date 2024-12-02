import admin, { db } from "@/app/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to update a class (event) with new details
 * - Replaces the existing event data in the specified subtimetable
 */
export async function PUT(req: NextRequest) {
  try {
    // Parse request body
    const { timetableId, subtimetableId, eventId, classData } =
      await req.json();

    // Validate input
    if (!timetableId || !subtimetableId || !eventId || !classData) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Reference to the specific event document
    const eventRef = db
      .collection("timetables")
      .doc(timetableId)
      .collection("subtimetables")
      .doc(subtimetableId)
      .collection("events")
      .doc(eventId);

    // Check if the event exists
    const eventDoc = await eventRef.get();
    if (!eventDoc.exists) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    // Update the event with new details
    await eventRef.set(
      {
        ...classData,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Class updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating class:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update class",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
