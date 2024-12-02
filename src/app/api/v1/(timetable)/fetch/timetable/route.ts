import admin from "@/app/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to fetch a timetable, its subtimetables, and their events.
 * - Applies global roles unless role is "specific".
 * - Removes "no-access" sub-timetables early.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timetableId = searchParams.get("timetableId");
  const userId = searchParams.get("userId");

  if (!timetableId || !userId) {
    return NextResponse.json(
      { success: false, message: "Both timetableId and userId are required" },
      { status: 400 }
    );
  }

  try {
    const db = admin.firestore();

    // Fetch timetable document
    const timetableDocRef = db.collection("timetables").doc(timetableId);
    const timetableDoc = await timetableDocRef.get();

    if (!timetableDoc.exists) {
      return NextResponse.json(
        { success: false, message: "Timetable not found" },
        { status: 404 }
      );
    }

    // Fetch user-specific shared data
    const sharedWithDoc = await db
      .collection(`timetables/${timetableId}/sharedWith`)
      .doc(userId)
      .get();

    if (!sharedWithDoc.exists) {
      return NextResponse.json(
        { success: false, message: "User not found in sharedWith list" },
        { status: 404 }
      );
    }

    const sharedWithData = sharedWithDoc.data();
    const globalRole = sharedWithData?.role || "reader";
    const specificRoles = sharedWithData?.subtimetablerolesRoles || {};

    // Fetch subtimetables in bulk
    const subtimetablesSnap = await db
      .collection(`timetables/${timetableId}/subtimetables`)
      .get();

    // Skip "no-access" sub-timetables early
    const accessibleSubtimetables = subtimetablesSnap.docs.filter((subDoc) => {
      const role =
        globalRole === "specific"
          ? specificRoles[subDoc.id] || "reader"
          : globalRole;
      return role !== "no-access";
    });

    // Fetch events for all accessible subtimetables in bulk
    const eventsPromises = accessibleSubtimetables.map((subDoc) =>
      subDoc.ref.collection("events").get()
    );

    const eventsSnaps = await Promise.all(eventsPromises);

    // Map subtimetables and embed roles and events
    const subtimetables = accessibleSubtimetables.map((subDoc, index) => {
      const subData = subDoc.data();
      const role =
        globalRole === "specific"
          ? specificRoles[subDoc.id] || "reader"
          : globalRole;

      const events = eventsSnaps[index].docs.map((eventDoc) => {
        const eventData = eventDoc.data();
        return {
          ...eventData,
          color: subData.color,
          role,
        };
      });

      return {
        id: subDoc.id,
        name: subData.name,
        color: subData.color,
        role,
        events,
      };
    });

    // Return optimized response
    return NextResponse.json(
      {
        success: true,
        timetable: { ...timetableDoc.data(), role: globalRole },
        subtimetables,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching timetable:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching timetable",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
