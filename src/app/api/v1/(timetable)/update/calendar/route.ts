import { db } from "@/app/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { calendarId, calendarData } = await req.json();

    if (!calendarId) {
      return NextResponse.json({
        success: false,
        message: "caelendarId not found",
      });
    }
    let isIdentifierExists = false;

    if (calendarData.identifier) {
      const querySnapshot = query(
        collection(db, "Calendar"),
        where("identifier", "==", calendarData.identifier),
        limit(1)
      );
      const calendar = await getDocs(querySnapshot);
      if (!calendar.empty) {
        calendar.forEach((cal) => {
          if (cal.data().identifier === calendarData.identifier) {
            isIdentifierExists = true;
          }
        });
      }
    }

    if (isIdentifierExists) {
      return NextResponse.json(
        { success: false, message: "email already exists" },
        { status: 200 }
      );
    }

    const calendarDocRef = doc(db, "Calendar", calendarId);

    await updateDoc(calendarDocRef, calendarData);

    return NextResponse.json(
      {
        success: true,
        message: "calendar updated succesfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error, message: error.message },
      { status: 500 }
    );
  }
}
