"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, Chip, Skeleton, Tooltip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Files, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import CreateSubTimetable from "../_components/CreateSubTimetable";

const SubTimetablePage = ({ params }: { params: any }) => {
  const timetableId = params.id;

  const [isCreateSubTimetableDialogOpen, setIsCreateSubTimetableDialogOpen] =
    useState(false);
  const [isUpdateSubTimetableDialogOpen, setIsUpdateSubTimetableDialogOpen] =
    useState(false);

  const { data, isPending, error, isPaused } = useQuery({
    queryKey: ["subtimetables", timetableId],
    queryFn: async () => {
      // Send GET request to fetch all sub-timetables
      const response = await fetch(
        `/api/v1/fetch/allsubtimetables?timetableId=${timetableId}`
      );
      return await response.json();
    },
    enabled: !!timetableId,
  });
  return (
    <>
      <Card>
        <CardHeader>Sub-calendar</CardHeader>
        <CardBody>
          {isPending ? (
            <Skeleton className="h-52 w-full rounded-xl  " />
          ) : data && data !== undefined ? (
            data.subTimetables.map((subTimetable: any, idx: number) => (
              <Card
                key={idx}
                radius="sm"
                fullWidth={true}
                shadow="sm"
                className=" p-3 my-2 flex flex-row items-center justify-between  "
              >
                <Chip
                  size="lg"
                  radius="md"
                  variant="shadow"
                  style={{ backgroundColor: subTimetable.color }}
                >
                  <h1 className=" font-bold text-base max-w-16 whitespace-nowrap truncate text-ellipsis ">
                    {subTimetable.name}
                  </h1>
                </Chip>

                <div className=" flex gap-1 items-center">
                  <Tooltip
                    content="Edit"
                    showArrow={true}
                    color="success"
                    radius="sm"
                    delay={500}
                  >
                    <Button
                      aria-label="Edit"
                      variant="bordered"
                      size="sm"
                      startContent={<SquarePen />}
                      color="success"
                      isIconOnly={true}
                      className=" max-w-[15px] "
                      onPress={() => {}}
                    />
                  </Tooltip>{" "}
                  <Tooltip
                    content="Copy"
                    showArrow={true}
                    color="warning"
                    delay={500}
                    radius="sm"
                  >
                    <Button
                      aria-label="copy"
                      variant="bordered"
                      size="sm"
                      startContent={<Files />}
                      isIconOnly={true}
                      color="warning"
                      className=" max-w-[15px] "
                    />
                  </Tooltip>
                  <Tooltip
                    content="Delete"
                    showArrow={true}
                    color="danger"
                    radius="sm"
                    delay={500}
                  >
                    <Button
                      aria-label="delete"
                      variant="bordered"
                      size="sm"
                      startContent={<Trash2 />}
                      isIconOnly={true}
                      color="danger"
                      className=" max-w-[15px] "
                    />
                  </Tooltip>
                </div>
              </Card>
            ))
          ) : (
            "No Subcalendars Found"
          )}
        </CardBody>
        <CardFooter className=" flex justify-end">
          <Button
            variant="bordered"
            size="md"
            radius="sm"
            color="primary"
            className="  "
            onPress={() => {
              setIsCreateSubTimetableDialogOpen(true);
            }}
          >
            + New Subcalendar
          </Button>
        </CardFooter>
      </Card>

      {/* {isCreateSubCalendarDialogOpen === true && (
        <CreateSubCalendar
          isSubcalendarDialogOpen={isCreateSubCalendarDialogOpen}
          setisSubcalendarDialogOpen={setIsCreateSubCalendarDialogOpen}
          // onSubmit={handleCreateSubCalendarSubmit}
        />
      )} */}
      {/* {isUpdateSubCalendarDialogOpen === true && (
        <UpdateSubCalendar
          isUpdateSubcalendarDialogOpen={isUpdateSubCalendarDialogOpen}
          setisUpdateSubcalendarDialogOpen={setIsUpdateSubCalendarDialogOpen}
          onSubmit={handleUpdateSubCalendarSubmit}
          subCalendarData={subCalendarToUpdate}
        />
      )} */}

      {isCreateSubTimetableDialogOpen === true && (
        <CreateSubTimetable
          isCreateSubTimetableDialogOpen={isCreateSubTimetableDialogOpen}
          setIsCreateSubTimetableDialogOpen={setIsCreateSubTimetableDialogOpen}
          timetableId={timetableId}
        />
      )}
    </>
  );
};

export default SubTimetablePage;
