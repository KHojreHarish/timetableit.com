import admin, { db } from "@/app/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to fetch all timetables stored in a user's document, including timetables shared with the user.
 *
 * - Retrieves both owned timetables from the user's `timetables` subcollection and shared timetables from the `sharedTimetable` subcollection.
 *
 * @param {NextRequest} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} - A JSON response containing the list of owned and shared timetables or an error.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing user ID" },
        { status: 400 }
      );
    }

    // Reference to the user's document in the 'users' collection
    const userRef = db.collection("users").doc(userId);

    // Reference to the timetables subcollection (owned timetables)
    const timetablesRef = userRef.collection("timetables");

    // Reference to the sharedTimetable subcollection (shared timetables)
    const sharedTimetablesRef = userRef.collection("sharedTimetable");

    // Fetch owned timetables
    const timetablesSnapshot = await timetablesRef.get();
    const ownedTimetables = timetablesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch shared timetables
    const sharedTimetablesSnapshot = await sharedTimetablesRef.get();
    const sharedTimetables = sharedTimetablesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Return the combined list of owned and shared timetables
    return NextResponse.json(
      {
        success: true,
        ownedTimetables,
        sharedTimetables,
        message: "Timetables fetched successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle any errors during the retrieval process
    console.error("Error fetching timetables:", error);

    // Return an error response in case of failure
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching timetables",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
