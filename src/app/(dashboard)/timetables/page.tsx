"use client";
import { CalendarRangeIcon, MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateTimetable from "@/components/CreateTimetable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Skeleton } from "@nextui-org/react";
import { toast } from "sonner";

/**
 * Convert Firestore timestamp object to a human-readable date format.
 * @param timestamp Firestore timestamp object with _seconds and _nanoseconds
 * @returns Formatted date string (e.g., "2023-07-12 10:42 AM")
 */
function convertFirestoreTimestampToDate(timestamp: {
  _seconds: number;
  _nanoseconds: number;
}): string {
  // Convert the _seconds part to milliseconds and create a Date object
  const date = new Date(timestamp._seconds * 1000);

  // Get date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");

  // Get time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  hours = hours % 12 || 12;

  // Return formatted string
  return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

const TimetablePage = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isCreateTimetableDialogOpen, setIsCreateTimetableDialogOpen] =
    useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is logged in, redirect to home and set the user state
        setUser(user);
      } else {
        // If no user is logged in, stop loading
        setIsLoading(false);
        router.push("/login"); // Redirect to login page
      }
    });

    return () => unsubscribe();
  }, [router]);

  const timetablesQuery = useQuery({
    queryKey: ["timetables"],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/fetch/alltimetablelist?userId=${user.uid}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch booking details");
      }

      return response.json();
    },
    enabled: !!user,
  });

  const deleteTimetableMutation = useMutation({
    mutationKey: ["deleteTimetable"],
    mutationFn: async (timetableId: string) => {
      const response = await fetch(`/api/v1/delete/timetable`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timetableId, userId: user.uid }),
      });

      if (!response.ok) {
        toast.error("something went wrong");
        throw new Error("Failed to delete timetable");
      }

      return response.json();
    },
    onSuccess(data) {
      data.success &&
        queryClient.invalidateQueries({ queryKey: ["timetables"] });
    },
  });

  return (
    <>
      {isCreateTimetableDialogOpen && (
        <CreateTimetable
          isCreateTimetableDialogOpen={isCreateTimetableDialogOpen}
          setIsCreateTimetableDialogOpen={setIsCreateTimetableDialogOpen}
          user={user}
        />
      )}
      <div>
        {" "}
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant={"ghost"}
                  className="h-8 gap-1"
                  onClick={() => setIsCreateTimetableDialogOpen(true)}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Create timetable
                  </span>
                </Button>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Timetables</CardTitle>
                  <CardDescription>Manage all your timetables.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>

                        <TableHead className="hidden md:table-cell">
                          CreatedBy
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className=" w-full">
                      {timetablesQuery.isLoading ? (
                        <div className="p-6 space-y-6">
                          {/* Skeleton Rows */}
                          {[1, 2, 3].map((index) => (
                            <div
                              key={index}
                              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 py-4 items-center border-b"
                            >
                              {/* Title with icon */}
                              <div className="flex items-center gap-3">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-4 w-24" />
                              </div>

                              {/* Status */}
                              <Skeleton className="h-4 w-16" />

                              {/* CreatedBy - hidden on mobile */}
                              <Skeleton className="hidden lg:block h-4 w-48" />

                              {/* Created at */}
                              <Skeleton className="h-4 w-32" />

                              {/* Actions */}
                              <div className="flex justify-end">
                                <Skeleton className="h-8 w-8" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : timetablesQuery.data &&
                        timetablesQuery.data.ownedTimetables.length > 0 ? (
                        timetablesQuery.data.ownedTimetables.map(
                          (timetable: any, idx: number) => (
                            <TableRow key={idx}>
                              <TableCell className="hidden sm:table-cell">
                                <CalendarRangeIcon />
                              </TableCell>
                              <TableCell className="font-medium">
                                {timetable.title}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {timetable.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {timetable.createdBy}
                              </TableCell>

                              <TableCell className="hidden md:table-cell">
                                {convertFirestoreTimestampToDate(
                                  timetable.createdAt
                                )}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 p-0 hover:bg-purple-100 focus-visible:ring-purple-500"
                                    >
                                      <MoreHorizontal className="h-4 w-4 text-purple-700" />
                                      <span className="sr-only">
                                        Toggle menu
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    align="end"
                                    className="w-48 bg-white/95 backdrop-blur-sm border-purple-100 rounded-lg shadow-lg"
                                  >
                                    <DropdownMenuLabel className="text-sm font-medium text-purple-700">
                                      Actions
                                    </DropdownMenuLabel>
                                    <Link
                                      href={`/c/${timetable.timetableId}`}
                                      isExternal
                                      showAnchorIcon
                                      className="flex items-center px-2 py-2 text-sm text-purple-900 hover:bg-purple-50 focus:bg-purple-50 cursor-pointer rounded-md"
                                    >
                                      Open
                                    </Link>
                                    <DropdownMenuItem className="text-purple-900 hover:bg-purple-50 focus:bg-purple-50 cursor-pointer">
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600 hover:bg-red-50 focus:bg-red-50 cursor-pointer"
                                      onClick={() =>
                                        deleteTimetableMutation.mutateAsync(
                                          timetable.id
                                        )
                                      }
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          )
                        )
                      ) : (
                        <div className=" w-max font-normal text-sm">
                          <p>No timetables found</p>
                        </div>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="shared">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Timetables</CardTitle>
                  <CardDescription>
                    Manage all your shared timetables.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Status</TableHead>

                        <TableHead className="hidden md:table-cell">
                          CreatedBy
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timetablesQuery.data &&
                      timetablesQuery.data.sharedTimetables.length > 0 ? (
                        timetablesQuery.data.sharedTimetables.map(
                          (timetable: any, idx: number) => (
                            <TableRow key={idx}>
                              <TableCell className="hidden sm:table-cell">
                                <CalendarRangeIcon />
                              </TableCell>
                              <TableCell className="font-medium">
                                {timetable.title}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {timetable.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {timetable.createdBy}
                              </TableCell>

                              <TableCell className="hidden md:table-cell">
                                {convertFirestoreTimestampToDate(
                                  timetable.sharedAt
                                )}
                              </TableCell>
                              <TableCell>
                                <Link
                                  isExternal
                                  showAnchorIcon
                                  href={`/c/${timetable.timetableId}`}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )
                      ) : (
                        <div className=" w-max font-normal text-sm">
                          <p>No timetables found</p>
                        </div>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                {/* <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter> */}
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default TimetablePage;
