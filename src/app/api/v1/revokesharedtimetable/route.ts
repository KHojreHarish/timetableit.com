import admin, { db } from "@/app/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to remove a team member's access from a timetable
 *
 * Steps:
 * 1. Finds the user by their email from Firebase Authentication.
 * 2. Removes the user from the `sharedWith` subcollection of the timetable.
 * 3. Removes the timetable from the user's `sharedTimetable` subcollection for clean-up.
 *
 * Request body:
 * - email: Email of the user whose access is being revoked.
 * - timetableId: ID of the timetable from which the user will be removed.
 *
 * Response:
 * - Success or error messages indicating the outcome of the operation.
 */
export async function DELETE(req: NextRequest) {
  // Destructure the email and timetableId from the request body
  const { email, timetableId }: { email: string; timetableId: string } =
    await req.json();

  // Validate the required fields
  if (!email || !timetableId) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Find the user by email using Firebase Authentication to get the userId
    const userRecord = await admin.auth().getUserByEmail(email);
    const userId = userRecord.uid; // Firebase Auth provides the userId

    // Reference to the timetable document based on the provided timetableId
    const timetableRef = db.collection("timetables").doc(timetableId);

    // Step 2: Check and remove the user from the `sharedWith` subcollection
    const sharedWithRef = timetableRef.collection("sharedWith").doc(userId);
    const sharedWithDoc = await sharedWithRef.get();

    // If the user is not found in the `sharedWith` list, return an error
    if (!sharedWithDoc.exists) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not have access to this timetable",
        },
        { status: 404 }
      );
    }

    // Delete the user from the `sharedWith` subcollection (revoking access)
    await sharedWithRef.delete();

    // Step 3: Remove the timetable from the user's `sharedTimetable` subcollection
    const userTimetableRef = db
      .collection("users")
      .doc(userId)
      .collection("sharedTimetable")
      .doc(timetableId);

    // Check if the timetable exists in the user's document and delete it
    const userTimetableDoc = await userTimetableRef.get();
    if (userTimetableDoc.exists) {
      await userTimetableRef.delete();
    }

    // Return success response after removing user access and cleaning up documents
    return NextResponse.json(
      { success: true, message: "User access removed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Log and return an error response in case of failure
    console.error("Error removing user access:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove user access",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
