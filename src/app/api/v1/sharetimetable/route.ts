import admin, { db } from "@/app/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    email,
    timetableId,
    role,
    roles,
  }: {
    email: string;
    timetableId: string;
    role: string;
    roles: Record<string, any>;
  } = await req.json();

  if (!email || !timetableId || !role) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Retrieve user ID from Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);
    const userId = userRecord.uid;

    // Firestore references
    const timetableRef = db.collection("timetables").doc(timetableId);
    const sharedWithRef = timetableRef.collection("sharedWith").doc(userId);
    const userSharedTimetableRef = db
      .collection("users")
      .doc(userId)
      .collection("sharedTimetable")
      .doc(timetableId);

    // Check if the user already has access to the timetable
    if ((await sharedWithRef.get()).exists) {
      return NextResponse.json(
        {
          success: false,
          message: "User already has access to this timetable",
        },
        { status: 409 }
      );
    }

    // Fetch timetable details
    const timetableDoc = await timetableRef.get();
    if (!timetableDoc.exists) {
      return NextResponse.json(
        { success: false, message: "Timetable not found" },
        { status: 404 }
      );
    }

    const { title, createdBy } = timetableDoc.data() || {};

    // Batch write for atomic operation
    const batch = db.batch();
    batch.set(sharedWithRef, {
      userId,
      role,
      subtimetablerolesRoles: roles,
      sharedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    batch.set(userSharedTimetableRef, {
      timetableId,
      title,
      status: "active",
      createdBy,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      sharedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    await batch.commit();

    return NextResponse.json(
      { success: true, message: "Timetable successfully shared with user" },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    console.error("Error sharing timetable:", error);
    return NextResponse.json(
      { success: false, message: "Failed to share timetable", error },
      { status: 500 }
    );
  }
}
