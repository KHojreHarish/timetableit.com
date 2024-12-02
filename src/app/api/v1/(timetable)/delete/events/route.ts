import { db } from "@/app/firebaseConfig";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { refId, calendarId } = await req.json();

    if (!refId) {
      return NextResponse.json({
        success: false,
        message: "eventId not found",
      });
    }

    const batch = writeBatch(db);
    const q = query(collection(db, "events"), where("refId", "==", refId));

    const querySnapshot = await getDocs(q);

    const eventIds: any[] = [];
    querySnapshot.forEach(async (doc) => {
      batch.delete(doc.ref);
      eventIds.push(doc.id);
    });

    await batch.commit();

    const calendarRef = doc(db, "Calendar", calendarId);

    // Update the document with the new event ID
    const updateCalendarDocument = await updateDoc(calendarRef, {
      eventIds: arrayRemove(...eventIds),
    });

    return NextResponse.json({
      success: true,
      message: "event(s) deleted succesfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error, message: error.message },
      { status: 500 }
    );
  }
}
