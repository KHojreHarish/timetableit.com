import { NextRequest, NextResponse } from "next/server";
import admin from "@/app/firebaseAdmin";

export async function POST(req: NextRequest) {
  const { timetableId, subTimetableData } = await req.json();

  if (!timetableId || !subTimetableData) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const { name, color } = subTimetableData;

    const db = admin.firestore();

    const subTimetableRef = db
      .collection("timetables")
      .doc(timetableId)
      .collection("subtimetables")
      .doc();

    await subTimetableRef.set({
      id: subTimetableRef.id,
      name,
      color,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Sub-timetable created successfully",
        subTimetableId: subTimetableRef.id,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create sub-timetable",
        error,
      },
      { status: 500 }
    );
  }
}
