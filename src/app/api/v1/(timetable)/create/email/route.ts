import { db } from "@/app/firebaseConfig";
import { createCalendarEmailNotice } from "@/lib/mailer";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { identifier, title } = await req.json();
    if (!identifier) {
      return NextResponse.json(
        {
          success: false,
          message: "please enter identifier",
        },
        { status: 400 }
      );
    }
    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "please enter name",
        },
        { status: 400 }
      );
    }
    const q = query(
      collection(db, "Calendar"),
      where("identifier", "==", identifier),
      limit(1)
    );
    const calendar = await getDocs(q);
    if (calendar.empty) {
      return NextResponse.json(
        {
          success: false,

          message: "no calendar exists",
        },
        { status: 404 }
      );
    }

    const data = calendar.docs[0].data();

    createCalendarEmailNotice(data.identifier, {
      id: calendar.docs[0].id,
      title: data.title,
    });
    return NextResponse.json(
      {
        success: true,

        message: "calendar link sent successfully",
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
