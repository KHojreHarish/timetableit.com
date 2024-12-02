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
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TimePage = ({ params }: { params: any }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [viewStartTime, setViewStartTime] = useState("2024-01-01T10:00:00");
  const [viewEndTime, setViewEndTime] = useState("2024-01-01T23:59:59");
  const [timeStep, setTimeStep] = useState("30");
  const [timeZone, setTimeZone] = useState("Asia/Kolkata");

  const [type, setType] = useState("child");

  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  const calendarId = params.id;

  useEffect(() => {
    const calendar = async () => {
      setIsLoading(true);
      try {
        await axios
          .get(`/api/v1/find/calendar?id=${calendarId}`)
          .then((response) => {
            if (response.data.success && response.status === 200) {
              const { viewStartTime, viewEndTime, timeZone, timeStep, type } =
                response.data.data.calendar;
              setViewStartTime(viewStartTime);
              setViewEndTime(viewEndTime);
              setTimeZone(timeZone);
              setTimeStep(timeStep);
              setType(type);
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
          calendarData: { viewStartTime, viewEndTime, timeZone, timeStep },
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
  const availableTimezones: any[] = moment.tz.names();

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-screen w-full rounded-xl  " />
      ) : type === "child" ? (
        " oops! you got into wrong place."
      ) : (
        <Card className=" w-full max-w-full ">
          <CardHeader>Time Settings</CardHeader>
          <CardBody className=" max-w-full">
            <Select
              variant="bordered"
              size="md"
              label="Calendar view starts"
              labelPlacement="outside"
              className=" my-3"
              required={true}
              defaultSelectedKeys={[viewStartTime]}
              placeholder="select start time"
              onSelectionChange={(e: any) => setViewStartTime(e.currentKey)}
            >
              <SelectItem key={"2024-01-01T00:00:00"}>12:00 am</SelectItem>
              <SelectItem key={"2024-01-01T01:00:00"}>1:00 am</SelectItem>
              <SelectItem key={"2024-01-01T02:00:00"}>2:00 am</SelectItem>
              <SelectItem key={"2024-01-01T03:00:00"}>3:00 am</SelectItem>
              <SelectItem key={"2024-01-01T04:00:00"}>4:00 am</SelectItem>
              <SelectItem key={"2024-01-01T05:00:00"}>5:00 am</SelectItem>
              <SelectItem key={"2024-01-01T06:00:00"}>6:00 am</SelectItem>
              <SelectItem key={"2024-01-01T07:00:00"}>7:00 am</SelectItem>
              <SelectItem key={"2024-01-01T08:00:00"}>8:00 am</SelectItem>
              <SelectItem key={"2024-01-01T09:00:00"}>9:00 am</SelectItem>
              <SelectItem key={"2024-01-01T10:00:00"}>10:00 am</SelectItem>
              <SelectItem key={"2024-01-01T11:00:00"}>11:00 am</SelectItem>
              <SelectItem key={"2024-01-01T12:00:00"}>12:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T13:00:00"}>1:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T14:00:00"}>2:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T15:00:00"}>3:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T16:00:00"}>4:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T17:00:00"}>5:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T18:00:00"}>6:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T19:00:00"}>7:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T20:00:00"}>8:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T21:00:00"}>9:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T22:00:00"}>10:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T23:00:00"}>11:00 pm</SelectItem>
            </Select>
            <Select
              variant="bordered"
              size="md"
              label="Calendar view ends"
              labelPlacement="outside"
              className=" my-3"
              required={true}
              defaultSelectedKeys={[viewEndTime]}
              placeholder="select end time"
              onSelectionChange={(e: any) => setViewEndTime(e.currentKey)}
            >
              <SelectItem key={"2024-01-01T01:00:00"}>1:00 am</SelectItem>
              <SelectItem key={"2024-01-01T02:00:00"}>2:00 am</SelectItem>
              <SelectItem key={"2024-01-01T03:00:00"}>3:00 am</SelectItem>
              <SelectItem key={"2024-01-01T04:00:00"}>4:00 am</SelectItem>
              <SelectItem key={"2024-01-01T05:00:00"}>5:00 am</SelectItem>
              <SelectItem key={"2024-01-01T06:00:00"}>6:00 am</SelectItem>
              <SelectItem key={"2024-01-01T07:00:00"}>7:00 am</SelectItem>
              <SelectItem key={"2024-01-01T08:00:00"}>8:00 am</SelectItem>
              <SelectItem key={"2024-01-01T09:00:00"}>9:00 am</SelectItem>
              <SelectItem key={"2024-01-01T10:00:00"}>10:00 am</SelectItem>
              <SelectItem key={"2024-01-01T11:00:00"}>11:00 am</SelectItem>
              <SelectItem key={"2024-01-01T12:00:00"}>12:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T13:00:00"}>1:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T14:00:00"}>2:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T15:00:00"}>3:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T16:00:00"}>4:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T17:00:00"}>5:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T18:00:00"}>6:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T19:00:00"}>7:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T20:00:00"}>8:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T21:00:00"}>9:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T22:00:00"}>10:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T23:00:00"}>11:00 pm</SelectItem>
              <SelectItem key={"2024-01-01T23:59:59"}>12:00 am</SelectItem>
            </Select>
            <Select
              variant="bordered"
              size="md"
              label="Calendar time steps"
              labelPlacement="outside"
              className=" my-3"
              required={true}
              defaultSelectedKeys={[timeStep]}
              placeholder="select time steps "
              onSelectionChange={(e: any) => setTimeStep(e.currentKey)}
            >
              <SelectItem key={"5"}>5</SelectItem>
              <SelectItem key={"15"}>15</SelectItem>
              <SelectItem key={"30"}>30</SelectItem>
              <SelectItem key={"60"}>60</SelectItem>
            </Select>
            <Select
              variant="bordered"
              size="md"
              label="Time zone"
              labelPlacement="outside"
              defaultSelectedKeys={[timeZone]}
              className=" my-3"
              required={true}
              placeholder="select time zone "
              onSelectionChange={(e: any) => setTimeZone(e.currentKey)}
            >
              {availableTimezones.map((timezone) => (
                <SelectItem key={timezone}>{timezone}</SelectItem>
              ))}
            </Select>
            <Select
              variant="bordered"
              size="md"
              label="Date format"
              labelPlacement="outside"
              className=" my-3"
              required={true}
              defaultSelectedKeys={["5"]}
              placeholder="select time format "
            >
              <SelectItem key={"5"}>31.12.24</SelectItem>
              <SelectItem key={"15"}>12/31/2024</SelectItem>
              <SelectItem key={"30"}>31/12/2024</SelectItem>
              <SelectItem key={"60"}>2024-12-31</SelectItem>
            </Select>

            <Select
              variant="bordered"
              size="md"
              label="Time format"
              labelPlacement="outside"
              className=" my-3"
              required={true}
              defaultSelectedKeys={["am"]}
              placeholder="select time format "
            >
              <SelectItem key={"-"}>{formattedTime}</SelectItem>
              <SelectItem key={"am"}>{`${formattedTime} am`}</SelectItem>
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
      )}
    </>
  );
};

export default TimePage;
