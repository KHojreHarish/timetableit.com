import { db } from "@/app/firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { eventData, timetableId } = await req.json();

    if (!eventData) {
      return NextResponse.json({
        success: false,
        message: "eventdata not found",
      });
    }
    const {
      id,
      description,
      end,
      start,
      repeatValue,
      allDay,
      subCalendarId,
      title,
    } = eventData;

    // Reference to the specific calendar inside the "timetables" collection
    const tiemtableRef = doc(db, "timetables", timetableId);

    // Reference to the "events" subcollection within the specific calendar
    const eventsRef = collection(tiemtableRef, "events");

    // Create the event document within the "events" subcollection
    const eventDocRef = doc(eventsRef, id);

    await setDoc(eventDocRef, {
      id,
      title,
      description,
      start,
      end,
      allDay,
      subCalendarId,
      repeatValue,
    });

    return NextResponse.json({
      success: true,
      message: "event updated succesfully",
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, error, message: error.message },
      { status: 500 }
    );
  }
}
