import { db } from "@/app/firebaseConfig";
import { arrayUnion, doc, updateDoc, writeBatch } from "firebase/firestore";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { eventData, calendarId } = await req.json();

    if (!eventData) {
      return NextResponse.json({
        success: false,
        message: "eventdata not found",
      });
    }

    const uniqueEventId = crypto.randomUUID();

    const batch = writeBatch(db);
    const eventIds: string[] = [];
    eventData.forEach((event: any) => {
      batch.set(doc(db, "events", uniqueEventId), {
        id: uniqueEventId,
        title: event.title,
        description: event.description,
        start: moment(event.start).toDate().toString(),
        end: moment(event.end).toDate().toString(),
        allDay: event.allDay,
        subCalendarId: event.subCalendarId,
        repeatValue: event.repeatValue,
        repetitionCount: event.repetitionCount,
        repetitionUntil: event.repetitionUntil,
        refId: event.refId,
      });
      eventIds.push(uniqueEventId);
    });

    await batch.commit();

    const calendarRef = doc(db, "Calendar", calendarId);

    // Update the document with the new event ID
    await updateDoc(calendarRef, {
      eventIds: arrayUnion(...eventIds),
    });

    return NextResponse.json({
      success: true,
      message: "event created succesfully",
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, error, message: error.message },
      { status: 500 }
    );
  }
}
