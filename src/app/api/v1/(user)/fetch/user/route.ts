import { db } from "@/app/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Extract email from query params
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    console.log("Searching for user with email:", email);

    // Reference to the users collection
    const usersRef = collection(db, "users");

    // Query to find the user document with matching email
    const q = query(usersRef, where("email", "==", email));

    // Execute the query
    const querySnapshot = await getDocs(q);

    console.log("Query Snapshot size:", querySnapshot.size);

    if (querySnapshot.empty) {
      console.log("User not found for email:", email);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Assuming emails are unique, we'll take the first result (there should be only one)
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    console.log("User data found:", userData);

    return NextResponse.json(
      { success: true, data: userData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching user details",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
