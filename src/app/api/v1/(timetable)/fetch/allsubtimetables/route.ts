import admin from "@/app/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

// types/subTimetable.ts
export interface SubTimetable {
  id: string;
  name: string;
  classroomId: string;
  teacherId: string;
  schedule: any;
}

/**
 * Fetches all subtimetables associated with a specified timetable.
 *
 * - Validates the presence and type of 'timetableId' in the request query.
 * - Retrieves subtimetables from the 'subtimetables' subcollection of the specified timetable.
 * - Returns a JSON response with the list of subtimetables or an error message.
 *
 * @param {NextRequest} req - The incoming HTTP request containing the timetable ID.
 * @returns {Promise<NextResponse>} - A JSON response with the subtimetables data or an error.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const timetableId = searchParams.get("timetableId");

  if (!timetableId || typeof timetableId !== "string") {
    return NextResponse.json(
      {
        success: false,
        message: "timetableId is required and must be a string",
      },
      { status: 400 }
    );
  }

  try {
    // Reference the subtimetables subcollection inside the specified timetable
    const subTimetablesRef = admin
      .firestore()
      .collection("timetables")
      .doc(timetableId)
      .collection("subtimetables");

    // Fetch all subtimetables from the subtimetables subcollection
    const subTimetablesSnapshot = await subTimetablesRef.get();

    if (subTimetablesSnapshot.empty) {
      return NextResponse.json(
        {
          success: false,
          message: "No subtimetables found",
        },
        { status: 404 }
      );
    }

    // Map over the documents and return the data
    const subTimetables: SubTimetable[] = subTimetablesSnapshot.docs.map(
      (doc) => {
        const data = doc.data() as SubTimetable;
        return {
          ...data,
          id: doc.id, // Assign `id` explicitly after spreading the document data
        };
      }
    );

    return NextResponse.json({ success: true, subTimetables }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subtimetables:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error,
      },
      { status: 500 }
    );
  }
}
