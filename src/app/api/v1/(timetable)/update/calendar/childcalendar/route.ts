import { db } from "@/app/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
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

    const data = {
      isActive: calendarData.isActive,
      accessName: calendarData.accessName,
      password: calendarData.password,
      accessLevel: calendarData.accessLevel,
      isProtected: false,
    };

    if (calendarData.password) {
      data.isProtected = true;
    }

    const calendarDocRef = doc(db, "Calendar", calendarId);

    await updateDoc(calendarDocRef, data);

    return NextResponse.json(
      {
        success: true,
        data: { id: calendarData.id, ...data },
        message: "calendar updated succesfully",
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
