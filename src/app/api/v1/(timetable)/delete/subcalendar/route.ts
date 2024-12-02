import { db } from "@/app/firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { subcalendarId, calendarId } = await req.json();

    if (!subcalendarId) {
      return NextResponse.json({
        success: false,
        message: "subCalendarId not found",
      });
    }
    if (!calendarId) {
      return NextResponse.json({
        success: false,
        message: "calendarId not found",
      });
    }

    const calendarRef = doc(db, "Calendar", calendarId);

    const subcalendarsQuery = query(
      collection(calendarRef, "subcalendars"),
      where("id", "==", subcalendarId)
    );

    await getDocs(subcalendarsQuery).then((querySnapshot) => {
      querySnapshot.forEach(async (subcalendar) => {
        const docRef = doc(calendarRef, "subcalendars", subcalendar.id);
        await deleteDoc(docRef);
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "subcalendar deleted succesfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { success: false, error, message: error.message },
      { status: 500 }
    );
  }
}
