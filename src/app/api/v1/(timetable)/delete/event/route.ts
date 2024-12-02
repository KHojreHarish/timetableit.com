import { db } from "@/app/firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { eventId, calendarId } = await req.json();

    if (!eventId) {
      return NextResponse.json({
        success: false,
        message: "eventId not found",
      });
    }

    const eventRef = doc(db, "events", eventId);
    await deleteDoc(eventRef);

    const calendarRef = doc(db, "Calendar", calendarId);

    // Update the document with removing the  event Id
    const updateCalendarDocument = await updateDoc(calendarRef, {
      eventIds: arrayRemove(eventId),
    });

    return NextResponse.json({
      success: true,
      message: "event deleted succesfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error, message: error.message },
      { status: 500 }
    );
  }
}
