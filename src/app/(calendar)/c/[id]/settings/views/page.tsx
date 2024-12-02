"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import axios from "axios";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SubCalendarPage = ({ params }: { params: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultView, setDefaultView] = useState("month");
  const [listViewPeriod, setListViewPeriod] = useState("one-month");
  const [groupListViewBy, setGroupListViewBy] = useState("month");
  const [showDetailInListView, setShowDetailInListView] = useState("no");
  const [hideWeekend, setHideWeekend] = useState("no");
  const [firstDayOfWeek, setFirstDayOfWeek] = useState("monday");

  const calendarId = params.id;
  useEffect(() => {
    const calendar = async () => {
      setIsLoading(true);
      try {
        await axios
          .get(`/api/v1/find/calendar?id=${calendarId}`)
          .then((response) => {
            if (response.data.success && response.status === 200) {
              const {
                defaultView,
                listViewPeriod,
                groupListViewBy,
                showDetailInListView,
                hideWeekend,
                firstDayOfWeek,
              } = response.data.data.calendar;

              setDefaultView(defaultView);
              setListViewPeriod(listViewPeriod);
              setGroupListViewBy(groupListViewBy);
              setShowDetailInListView(showDetailInListView);
              setHideWeekend(hideWeekend);
              setFirstDayOfWeek(firstDayOfWeek);
            } else {
              toast.error("something went wrong");
            }
            setIsLoading(false);
          });
      } catch (error) {
        toast.error("something went wrong");

        setIsLoading(false);
      }
    };
    calendar();
  }, [calendarId]);

  const handleSettingUpdateSubmit = async () => {
    setIsLoading(true);
    try {
      await axios
        .post(`/api/v1/update/calendar`, {
          calendarId,
          calendarData: {
            defaultView: defaultView || "month",
            listViewPeriod: listViewPeriod || "one-month",
            groupListViewBy: groupListViewBy || "month",
            showDetailInListView: showDetailInListView || "no",
            hideWeekend: hideWeekend || "no",
            firstDayOfWeek: firstDayOfWeek || "monday",
          },
        })
        .then(async (response) => {
          if (response.data.success && response.status === 200) {
            toast.success("setting(s) updated successfully");
          } else {
            toast.error("something went wrong");
          }
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");

      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-screen w-full rounded-xl  " />
      ) : (
        <div className=" flex flex-wrap max-w-full gap-4 ">
          <Card className=" w-full max-w-full ">
            <CardHeader>View Settings</CardHeader>
            <CardBody className=" max-w-full  ">
              <div className=" w-full h-fit flex items-center rounded border-2 p-2 mb-2 gap-2 ">
                <Info />
                You can also set these and many other settings like
                <b> &#34;Dark Mode&#34;</b>
                individually for each access link
              </div>
              <Select
                variant="bordered"
                size="md"
                label="Default view"
                labelPlacement="outside"
                placeholder="select calendar default view"
                defaultSelectedKeys={[defaultView]}
                className=" my-3 max-w-full "
                onSelectionChange={(e: any) => {
                  setDefaultView(e.currentKey);
                }}
              >
                <SelectItem key={"day"}>Day</SelectItem>
                <SelectItem key={"week"}>Week</SelectItem>
                <SelectItem key={"month"}>Month</SelectItem>
                <SelectItem key={"year"}>Year</SelectItem>
                <SelectItem key={"list"}>List</SelectItem>
                <SelectItem key={"planner"}>Planner</SelectItem>
              </Select>
              <hr className=" mb-2" />
              <Select
                variant="bordered"
                size="md"
                label="List view period"
                labelPlacement="outside"
                placeholder="select list view period"
                defaultSelectedKeys={[listViewPeriod]}
                className=" my-3 max-w-full "
                onSelectionChange={(e: any) => {
                  setListViewPeriod(e.currentKey);
                }}
              >
                <SelectItem key={"one-day"}>One Day</SelectItem>
                <SelectItem key={"one-week"}>One Week</SelectItem>
                <SelectItem key={"two-week"}>Two Weeks</SelectItem>
                <SelectItem key={"one-month"}>One Month</SelectItem>
                <SelectItem key={"quarter-year"}>Quarter Year</SelectItem>
                <SelectItem key={"half-year"}>Half Year</SelectItem>
                <SelectItem key={"one-year"}>One Year</SelectItem>
              </Select>

              <Select
                variant="bordered"
                size="md"
                label="Group List view by"
                labelPlacement="outside"
                placeholder="select group"
                defaultSelectedKeys={[groupListViewBy]}
                className=" my-3 max-w-full "
                onSelectionChange={(e: any) => {
                  setGroupListViewBy(e.currentKey);
                }}
              >
                <SelectItem key={"nothing"}>Nothing</SelectItem>
                <SelectItem key={"week"}> Week</SelectItem>
                <SelectItem key={"month"}> Month</SelectItem>
              </Select>
              <Select
                variant="bordered"
                size="md"
                label="Show details in list view"
                labelPlacement="outside"
                placeholder="select whether "
                defaultSelectedKeys={[showDetailInListView]}
                className=" my-3 max-w-full "
                onSelectionChange={(e: any) => {
                  setShowDetailInListView(e.currentKey);
                }}
              >
                <SelectItem key={"no"}>NO</SelectItem>
                <SelectItem key={"yes"}> Yes</SelectItem>
              </Select>
              <hr className=" mb-2" />

              <Select
                variant="bordered"
                size="md"
                label="Hide weekend"
                labelPlacement="outside"
                placeholder="select whether "
                defaultSelectedKeys={[hideWeekend]}
                className=" my-3 max-w-full "
                onSelectionChange={(e: any) => {
                  setHideWeekend(e.currentKey);
                }}
              >
                <SelectItem key={"no"}>NO</SelectItem>
                <SelectItem key={"yes"}> Yes</SelectItem>
              </Select>

              <Select
                variant="bordered"
                size="md"
                label="First day of the week"
                labelPlacement="outside"
                placeholder="select whether "
                defaultSelectedKeys={[firstDayOfWeek]}
                className=" my-3 max-w-full "
                onSelectionChange={(e: any) => {
                  setFirstDayOfWeek(e.currentKey);
                }}
              >
                <SelectItem key={"sunday"}>Sunday</SelectItem>
                <SelectItem key={"monday"}> Monday</SelectItem>
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
        </div>
      )}
    </>
  );
};

export default SubCalendarPage;
