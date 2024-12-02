import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { eventIds } = await req.json();
  try {
    if (!eventIds || eventIds.length <= 0) {
      return NextResponse.json({
        success: false,
        message: "eventIds not found",
      });
    }

    const Events: any[] = [];

    const querySnapshot = await getDocs(collection(db, "events"));

    querySnapshot.forEach((doc) => {
      const documentData = doc.data();
      const eventId = doc.id;
      if (eventIds.includes(eventId)) {
        Events.push(documentData);
      }
    });

    return NextResponse.json({ success: true, data: Events }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error, message: error.message },
      { status: 500 }
    );
  }
}
