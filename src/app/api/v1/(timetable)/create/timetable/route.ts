import admin, { db } from "@/app/firebaseAdmin";
import { createCalendarEmailNotice } from "@/lib/mailer";
import { color } from "framer-motion";
import { NextRequest, NextResponse } from "next/server";

/**
 * Optimized API route to create a new timetable (calendar) and associate it with a user.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const batch = db.batch();

  try {
    // Parse request body
    const { title, user } = await req.json();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { success: false, message: "Please enter a valid title" },
        { status: 400 }
      );
    }

    // Create references
    const newTimetableRef = db.collection("timetables").doc();
    const userRef = db.collection("users").doc(user.uid);
    const userTimetableRef = userRef
      .collection("timetables")
      .doc(newTimetableRef.id);
    const sharedWithRef = newTimetableRef
      .collection("sharedWith")
      .doc(user.uid);
    const subtimetableRef = newTimetableRef.collection("subtimetables").doc();

    // Prepare data with necessary fields
    const timetableData = {
      title,
      createdBy: user.email,
      accessName: "Creator",
      password: "",
      defaultView: "month",
      isProtected: false,
      firstDayOfWeek: "monday",
      isActive: true,
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now(),
    };

    const subTimetableData = {
      name: "XII",
      createdBy: user.email,
      createdAt: admin.firestore.Timestamp.now(),
      status: "active",
      color: "#dadada",
    };

    const userTimetableData = {
      timetableId: newTimetableRef.id,
      title,
      createdBy: user.email,
      createdAt: admin.firestore.Timestamp.now(),
      status: "active",
    };

    // Prepare sharedWithData with required structure
    const sharedWithData = {
      role: "admin",
      sharedAt: admin.firestore.FieldValue.serverTimestamp(),
      userId: user.uid,
    };

    // Batch set operations for core data
    batch.set(newTimetableRef, timetableData);
    batch.set(subtimetableRef, subTimetableData);
    batch.set(userTimetableRef, userTimetableData);
    batch.set(sharedWithRef, sharedWithData);

    // Commit the core batch and start email notification asynchronously
    await batch.commit();

    // Non-blocking email notification
    createCalendarEmailNotice(user.email, {
      id: newTimetableRef.id,
      title,
    });

    return NextResponse.json(
      {
        success: true,
        timetableId: newTimetableRef.id,
        message: "Timetable created successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating timetable:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error creating timetable",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
