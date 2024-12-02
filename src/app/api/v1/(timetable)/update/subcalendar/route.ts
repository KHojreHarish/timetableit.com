import { db } from "@/app/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { subCalendarData, calendarId } = await req.json();

    if (!subCalendarData) {
      return NextResponse.json({
        success: false,
        message: "data not found",
      });
    }
    if (!calendarId) {
      return NextResponse.json({
        success: false,
        message: "data not found",
      });
    }

    const calendarRef = doc(db, "Calendar", calendarId);

    const targetId = subCalendarData.id;

    const subcalendarsQuery = query(
      collection(calendarRef, "subcalendars"),
      where("id", "==", targetId)
    );
    await getDocs(subcalendarsQuery).then((querySnapshot) => {
      querySnapshot.forEach((subcalendar) => {
        setDoc(
          doc(collection(calendarRef, "subcalendars"), subcalendar.id),
          subCalendarData,
          { merge: true }
        );
      });
    });

    return NextResponse.json(
      {
        success: true,
        message: "subcalendar updated succesfully",
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
