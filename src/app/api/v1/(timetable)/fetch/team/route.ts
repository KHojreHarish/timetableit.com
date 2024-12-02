import admin, { db } from "@/app/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to fetch all team members of a timetable
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timetableId = searchParams.get("timetableId");

  if (!timetableId) {
    return NextResponse.json(
      { success: false, message: "Missing required timetableId" },
      { status: 400 }
    );
  }

  try {
    const timetableRef = db.collection("timetables").doc(timetableId);
    const sharedWithSnapshot = await timetableRef
      .collection("sharedWith")
      .get();

    if (sharedWithSnapshot.empty) {
      return NextResponse.json(
        { success: false, message: "No team members found for this timetable" },
        { status: 404 }
      );
    }

    // Extract user IDs and shared data from the documents
    const userIds: any[] = [];
    const sharedDataMap: Record<string, any> = {};

    sharedWithSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      const userId = data.userId;
      userIds.push(userId);
      sharedDataMap[userId] = {
        role: data.role,
        subtimetablerolesRoles: data.subtimetablerolesRoles,
        sharedAt: data.sharedAt ? data.sharedAt.toDate() : null, // Fallback for sharedAt
      };
    });

    // Batch fetch user details from Firebase Authentication
    const userRecords = await admin
      .auth()
      .getUsers(userIds.map((uid) => ({ uid })));

    // Map user records with shared data
    const teamMembers = userRecords.users.map((user) => ({
      userId: user.uid,
      email: user.email,
      ...sharedDataMap[user.uid],
    }));

    return NextResponse.json({ success: true, teamMembers }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch team members",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
