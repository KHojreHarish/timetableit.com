"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Textarea,
} from "@nextui-org/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";

const SettingsPage = ({ params }: { params: any }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("my calendar");
  const [identifier, setIdentifier] = useState("demo@gmail.com");
  const [language, setLanguage] = useState("eng");
  const [isBrandingVisible, setIsBrandingVisible] = useState("yes");

  // maintain the history of identifier
  const [identifierFetched, setIdentifierFetched] = useState("");

  const timetableId = params.id;

  // fetcing inital timetable Data
  const timetableQuery = useQuery({
    queryKey: ["timetable", timetableId],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/fetch/timetable?timetableId=${timetableId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch timetable Data.");
      }

      return response.json();
    },
    enabled: !!timetableId,
    refetchOnWindowFocus: false,
  });

  const data: any = {
    title,
    identifier,
    isBrandingVisible,
    language,
  };

  if (identifierFetched === identifier) {
    delete data.identifier;
  }

  const updateTimetableMutation = useMutation({
    mutationFn: (data: any) =>
      fetch("/api/v1/update/timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
  });

  const handleSettingUpdateSubmit = async () => {
    updateTimetableMutation.mutate({ timetableId, calendarData: data });
    // try {
    //   await axios
    //     .post(`/api/v1/update/calendar`, {
    //       timetableId,
    //       calendarData: data,
    //     })
    //     .then(async (response) => {
    //       if (response.data.success === false && response.status === 200) {
    //         toast.warning("email already exists");
    //       } else if (response.data.success && response.status === 200) {
    //         toast.success("setting(s) updated successfully");
    //       } else {
    //         toast.error("something went wrong");
    //       }
    //       setIsLoading(false);
    //     });
    // } catch (error) {
    //   console.log(error);
    //   toast.error("something went wrong");

    //   setIsLoading(false);
    // }
  };

  const deleteTimetableMutation = useMutation({
    mutationFn: (data: any) =>
      fetch("/api/v1/delete/timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
  });

  const handleDeleteCalendar = async () => {
    deleteTimetableMutation.mutate(timetableId);
    // try {
    //   await axios
    //     .post(`/api/v1/delete/calendar`, {
    //       timetableId,
    //     })
    //     .then(async (response) => {
    //       if (response.data.success && response.status === 200) {
    //         router.replace("/");
    //         toast.success("Calendar deleted successfully");
    //       } else {
    //         toast.error("something went wrong");
    //       }
    //       setIsLoading(false);
    //     });
    // } catch (error) {
    //   console.log(error);
    //   toast.error("something went wrong");

    //   setIsLoading(false);
    // }
  };

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-screen w-full rounded-xl  " />
      ) : (
        <div className=" flex flex-wrap max-w-full gap-4 ">
          <Card fullWidth className=" w-full max-w-full ">
            <CardHeader>General Settings</CardHeader>
            <CardBody className=" max-w-full">
              <Input
                variant="bordered"
                size="md"
                label="Calendar name"
                labelPlacement="outside"
                placeholder="Enter calendar name"
                defaultValue={title}
                className=" my-3 max-w-full "
                onChange={(e: any) => {
                  setTitle(e.target.value);
                }}
              />
              <Input
                variant="bordered"
                size="md"
                label="Email"
                labelPlacement="outside"
                placeholder="Enter email"
                defaultValue={identifier}
                className=" my-3 "
                onChange={(e: any) => setIdentifier(e.target.value)}
              />
              <Select
                variant="bordered"
                size="md"
                defaultSelectedKeys={[language]}
                label="Language"
                labelPlacement="outside"
                className=" my-3"
                required={true}
                placeholder="select language"
              >
                <SelectItem key={"eng"}>English</SelectItem>
              </Select>
              <Select
                variant="bordered"
                size="md"
                defaultSelectedKeys={[isBrandingVisible]}
                label="Hide Branding"
                labelPlacement="outside"
                placeholder="select if branding is hidden"
                className=" my-3"
                onSelectionChange={(e: any) =>
                  setIsBrandingVisible(e.currentKey)
                }
              >
                <SelectItem key={"yes"}>yes</SelectItem>
                <SelectItem key={"no"}>no</SelectItem>
              </Select>
              <Select
                variant="bordered"
                size="md"
                defaultSelectedKeys={["no"]}
                label="delete events in past"
                labelPlacement="outside"
                placeholder="select event delete frequency"
                className=" my-3"
                required={true}
              >
                <SelectItem key={"no"}>No</SelectItem>
                <SelectItem key={"one-day"}>After one day</SelectItem>
                <SelectItem key={"two-day"}>After two day</SelectItem>
                <SelectItem key={"three-day"}>After three day</SelectItem>
                <SelectItem key={"one-week"}>after one week</SelectItem>
                <SelectItem key={"two-week"}>after two week</SelectItem>
                <SelectItem key={"one-month"}>after one month</SelectItem>
                <SelectItem key={"two-month"}>after two month</SelectItem>
                <SelectItem key={"three-month"}>after three month</SelectItem>
                <SelectItem key={"six-month"}>after six month</SelectItem>
                <SelectItem key={"one-year"}>after one year</SelectItem>
                <SelectItem key={"twp-year"}>after two year</SelectItem>
                <SelectItem key={"three-year"}>after three year</SelectItem>
              </Select>
            </CardBody>
            <CardFooter className=" flex w-full justify-end items-center ">
              <Button
                variant="bordered"
                size="md"
                color="success"
                onPress={() => handleSettingUpdateSubmit()}
              >
                Save
              </Button>
            </CardFooter>
          </Card>
          <Card fullWidth className=" w-full max-w-full ">
            <CardHeader>Delete Calendar</CardHeader>
            <CardBody>
              <Select
                variant="bordered"
                size="md"
                defaultSelectedKeys={["n"]}
                label="Reason for Deletion"
                labelPlacement="outside"
                placeholder="select reason for deletion"
                className=" my-3"
                required={true}
              >
                <SelectItem key={"n"}>Not Specified</SelectItem>
                <SelectItem key={"t1"}>Too few functions</SelectItem>
                <SelectItem key={"o1"}>Overpriced</SelectItem>
                <SelectItem key={"t2"}>Too complex</SelectItem>
              </Select>
              <Textarea
                variant="bordered"
                size="lg"
                label="Comment"
                labelPlacement="outside"
                placeholder="to help us improve our service, you can send us suggestions here."
              />
            </CardBody>
            <CardFooter className=" flex  justify-end items-center">
              <AlertDialog>
                <AlertDialogTrigger className=" border-red-600 border-2 text-red-600 rounded-xl p-2 ">
                  Delete Calendar
                </AlertDialogTrigger>
                <AlertDialogContent className=" bg-slate-100 rounded-md  ">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className=" rounded-xl ">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction>
                      <Button
                        variant="flat"
                        size="md"
                        radius="md"
                        color="danger"
                        onPress={() => handleDeleteCalendar()}
                      >
                        Continue
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default SettingsPage;
