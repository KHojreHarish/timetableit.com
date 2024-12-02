import admin from "@/app/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to delete a timetable, its related subcollections, and update the user's sharedWith list.
 */
export async function DELETE(req: NextRequest) {
  const { timetableId, userId } = await req.json();

  if (!timetableId || !userId) {
    return NextResponse.json(
      { success: false, message: "Missing timetableId or userId" },
      { status: 400 }
    );
  }

  try {
    const db = admin.firestore();
    const timetableRef = db.collection("timetables").doc(timetableId);

    // Step 1: Delete the timetable from the user's `timetables` subcollection
    const userRef = db.collection("users").doc(userId);
    const userTimetableRef = userRef.collection("timetables").doc(timetableId);
    await userTimetableRef.delete();

    // Step 2: Delete the timetable from the `sharedWith` subcollection of other users
    const sharedWithSnap = await timetableRef.collection("sharedWith").get();
    await Promise.all(
      sharedWithSnap.docs.map(async (doc) => {
        const data = doc.data();
        const sharedUserId = data.userId;

        // Remove the timetable from the user's sharedTimetable subcollection
        const userSharedTimetableRef = db
          .collection("users")
          .doc(sharedUserId)
          .collection("sharedTimetable")
          .doc(timetableId);
        await userSharedTimetableRef.delete();

        // Delete the sharedWith entry for the user
        await doc.ref.delete();
      })
    );

    // Step 3: Delete subtimetables and events
    const subtimetablesSnap = await timetableRef
      .collection("subtimetables")
      .get();
    await Promise.all(
      subtimetablesSnap.docs.map(async (subDoc) => {
        const eventsSnap = await subDoc.ref.collection("events").get();
        await Promise.all(eventsSnap.docs.map((event) => event.ref.delete())); // Delete events
        await subDoc.ref.delete(); // Delete subtimetable
      })
    );

    // Step 4: Delete the timetable document itself
    await timetableRef.delete();

    return NextResponse.json(
      {
        success: true,
        message: "Timetable and associated data deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting timetable:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete timetable",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
