import {
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Textarea,
  cn,
} from "@nextui-org/react";
import { Select, SelectItem, SelectedItems } from "@nextui-org/select";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteEvent } from "@/lib/calendarUtils/DbUtils";
import { Check, Trash, Trash2, X } from "lucide-react";
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
} from "../alert-dialog";
import { Label } from "../label";

const UpdateEvent = ({
  event,
  subCalendars,
  onSubmit,
  onDelete,
  isEventDialogOpen,
  setisEventDialogOpen,
  accessLevel,
}: any) => {
  let newIds: any = [];

  const [title, setTitle] = useState<string>(event.title);
  const [description, setDescription] = useState<string>(event.description);
  const [start, setStart] = useState<Date>(event.start);
  const [end, setEnd] = useState<Date>(event.end);
  const [isAllDay, setIsAllDay] = useState<boolean>(event.allDay);
  const [repeatValue, setRepeatValue] = useState<string>(event.repeatValue);
  const [eventSubCalendars, setEventSubCalendars] = useState(
    event.subCalendarId
  );
  const [repetitionCount, setRepetitionCount] = useState<number>(
    event.repetitionCount || undefined
  );
  const [repetitionUntil, setRepetitionUntil] = useState<Date>(
    event.repetitionUntil || undefined
  );
  const [refId, setRefId] = useState(event.refId || undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || newIds.length === 0) {
      toast.error("please fill up all the required fields");
    } else {
      onSubmit({
        id: event.id,
        title,
        description,
        start,
        end,
        allDay: isAllDay,
        repeatValue,
        subCalendarId: newIds,
      });
      setisEventDialogOpen(false);
      setTitle("");
      setStart(new Date());
      setEnd(new Date());
      setIsAllDay(false);
      newIds = [];
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Modal
        isOpen={isEventDialogOpen}
        onOpenChange={() => setisEventDialogOpen(false)}
        isDismissable={false}
        size={windowWidth <= 768 ? "full" : "3xl"}
        classNames={{ wrapper: " h-full w-full" }}
        placement="center"
        scrollBehavior={"inside"}
        backdrop={"blur"}
        id="Event-Form"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl">
                Update Event
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <Label className=" text-2xl mb-2 " aria-label="Event-title">
                    Event Title
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    size="lg"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    isRequired
                    autoFocus
                    endContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        name="Event-Title"
                      >
                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                      </svg>
                    }
                    placeholder="Enter Event Title"
                    defaultValue={title}
                    variant="bordered"
                    errorMessage="Please enter Good Event Title"
                    isDisabled={accessLevel === "read" ? true : false}
                  />
                  <Label
                    className=" mt-4 text-2xl"
                    aria-label="Event Description"
                  >
                    Event Description
                  </Label>

                  <Textarea
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    isRequired
                    variant="bordered"
                    placeholder="Enter Event description"
                    size="lg"
                    disableAutosize
                    name="Event-Description"
                    endContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    }
                    isDisabled={accessLevel === "read" ? true : false}
                  />
                  <div className=" mt-4 flex flex-col w-full justify-around">
                    <Label
                      className="  w-full text-2xl "
                      aria-label="Time Frame"
                    >
                      Time Frame
                    </Label>
                    <label
                      htmlFor="from"
                      className="  text-[0.9rem] font-normal text-xl text-[#76767a]"
                    >
                      From
                    </label>
                    <input
                      type="datetime-local"
                      id="start"
                      value={moment(start).format("yyyy-MM-DDThh:mm")}
                      onChange={(e) => setStart(new Date(e.target.value))}
                      required
                      className=" border-2 border-[#dedee7] rounded-[5px] min-h-[3rem]"
                      disabled={accessLevel === "read" ? true : false}
                    />
                    <label
                      htmlFor="from"
                      className="  text-[0.9rem] font-normal text-xl text-[#76767a]"
                    >
                      Till
                    </label>
                    <input
                      type="datetime-local"
                      id="end"
                      value={moment(end).format("yyyy-MM-DDThh:mm")}
                      onChange={(e) => setEnd(new Date(e.target.value))}
                      required
                      className=" border-2 border-[#dedee7] rounded-[5px] min-h-[3rem]"
                      disabled={accessLevel === "read" ? true : false}
                    />
                  </div>

                  <Switch
                    aria-label="Automatic updates"
                    classNames={{
                      wrapper:
                        "p-0 h-4 overflow-visible bg-[#C3C3C3] group-data-[selected=true]:bg-[#5575A7]",
                      thumb: cn(
                        "w-6 h-6 border-2 shadow-lg",
                        "group-data-[hover=true]:border-primary",
                        //selected
                        "group-data-[selected=true]:ml-6",
                        // pressed
                        "group-data-[pressed=true]:w-7",
                        "group-data-[selected]:group-data-[pressed]:ml-4"
                      ),
                      label: " text-xl",
                    }}
                    id="EntireDay"
                    isSelected={isAllDay}
                    onChange={(e) => {
                      setIsAllDay(e.target.checked);
                    }}
                    className=" m-4 ml-1"
                    isDisabled={accessLevel === "read" ? true : false}
                  >
                    Entire Day
                  </Switch>
                  <Select
                    label="Repeat"
                    aria-label="Repeat"
                    size="lg"
                    variant="bordered"
                    className=" max-h-xs"
                    isDisabled
                    defaultSelectedKeys={[repeatValue]}
                    onChange={(e) => {
                      setRepeatValue(e.target.value);
                    }}
                  >
                    <SelectItem
                      key={"never"}
                      value={"never"}
                      textValue={"never"}
                    >
                      Never
                    </SelectItem>
                    <SelectItem
                      key={"daily"}
                      value={"daily"}
                      textValue={"daily"}
                    >
                      Daily
                    </SelectItem>
                    <SelectItem
                      key={"weekly"}
                      value={"weekly"}
                      textValue={"weekly"}
                    >
                      Weekly
                    </SelectItem>
                    <SelectItem
                      key={"monthly"}
                      value={"monthly"}
                      textValue={"monthly"}
                    >
                      Monthly
                    </SelectItem>
                    <SelectItem
                      key={"quarterly"}
                      value={"qurterly"}
                      textValue={"quarterly"}
                    >
                      {" "}
                      Quarterly
                    </SelectItem>
                    <SelectItem
                      key={"yearly"}
                      value={"yearly"}
                      textValue={"yearly"}
                    >
                      Yearly
                    </SelectItem>
                  </Select>
                  {repeatValue !== "never" && (
                    <div className=" flex gap-3 m-4 ">
                      Ends{" "}
                      <Select
                        aria-label="Repeat"
                        size="sm"
                        variant="bordered"
                        className=" max-h-xs max-w-[8rem] "
                        defaultSelectedKeys={[
                          `${
                            repetitionCount === undefined
                              ? repetitionUntil === undefined
                                ? "after"
                                : "on"
                              : "after"
                          }`,
                        ]}
                        isDisabled
                      >
                        <SelectItem key={"never"}>Never</SelectItem>
                        <SelectItem key={"on"}>On</SelectItem>
                        <SelectItem key={"after"}>After</SelectItem>
                      </Select>
                      <div className=" flex items-center justify-center">
                        {repetitionCount !== undefined && (
                          <Input
                            placeholder="repetition"
                            variant="bordered"
                            size="sm"
                            type="number"
                            isRequired
                            isDisabled
                            className=" max-h-[2rem] max-w-md"
                            defaultValue={repetitionCount.toString()}
                            onChange={(e) =>
                              setRepetitionCount(Number(e.target.value))
                            }
                          />
                        )}

                        {repetitionUntil !== undefined && (
                          <Input
                            variant="bordered"
                            size="sm"
                            type="date"
                            className=" max-w-md"
                            isRequired
                            isDisabled
                            defaultValue={moment(repetitionUntil).format(
                              "yyyy-MM-DD"
                            )}
                            onChange={(e) =>
                              setRepetitionUntil(new Date(e.target.value))
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}

                  <Label className=" text-2xl mt-4" aria-label="sub-calendars">
                    Sub-Calendars
                  </Label>
                  <Select
                    aria-label="Sub-Calendars"
                    items={subCalendars}
                    variant="bordered"
                    isMultiline={true}
                    size="lg"
                    selectionMode="multiple"
                    placeholder="Select sub-calendar"
                    isRequired
                    isDisabled={accessLevel === "read" ? true : false}
                    defaultSelectedKeys={eventSubCalendars}
                    renderValue={(items: SelectedItems<any>) => {
                      items.forEach((item) => {
                        if (!newIds.includes(item.data.id)) {
                          newIds.push(item.data.id);
                        }
                      });
                      return (
                        <div className="flex flex-wrap gap-2">
                          {items.map((item) => (
                            <Chip
                              key={item.key}
                              style={{ backgroundColor: item.data.color }}
                            >
                              {item.data.name}
                            </Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(subCalendars) => (
                      <SelectItem
                        key={subCalendars.id}
                        textValue={subCalendars.name}
                      >
                        <div className="flex gap-2 items-center">
                          <div className="flex flex-col">
                            <span className="text-small">
                              {subCalendars.name}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                  <Label>Reminder&apos;s</Label>
                  <ModalFooter>
                    <Button
                      startContent={<X />}
                      color="danger"
                      variant="flat"
                      onPress={() => onClose()}
                    >
                      Abort
                    </Button>
                    {accessLevel !== "read" && refId === undefined ? (
                      <Button
                        startContent={<Trash2 />}
                        color="danger"
                        variant="flat"
                        onPress={() => {
                          onDelete(event.id, "single");
                          onClose();
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <AlertDialog>
                        {accessLevel !== "read" ? (
                          <AlertDialogTrigger className=" flex justify-center items-center gap-3 bg-[#FDD0DF] text-[#F53D7C] px-3 rounded-xl ">
                            <Trash2 />
                            Delete
                          </AlertDialogTrigger>
                        ) : null}
                        <AlertDialogContent className=" bg-slate-100 rounded-md  ">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Do you want to delete all occurence(s) or this
                              only.
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete event(s) and remove your data
                              from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className=" rounded-xl">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                onDelete(event.id, "single");
                                onClose();
                              }}
                            >
                              {/* <Button
                                startContent={<Trash />}
                                color="danger"
                                size="md"
                                variant="flat"
                                className=" !-m-4 "
                                onPress={() => {
                                  handleDelete("single");
                                  onClose();
                                }}
                              > */}
                              Delete
                              {/* </Button> */}
                            </AlertDialogAction>
                            <AlertDialogAction
                              onClick={() => {
                                onDelete(refId, "multiple");
                                onClose();
                              }}
                            >
                              {/* <Button
                                startContent={<Trash2 />}
                                color="danger"
                                size="md"
                                variant="flat"
                                onPress={() => {
                                  handleDelete("multiple");
                                  onClose();
                                }}
                                className=" !-m-4 "
                              > */}
                              Delete All
                              {/* </Button> */}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                    {accessLevel !== "read" ? (
                      <Button
                        startContent={<Check />}
                        color="success"
                        type="submit"
                      >
                        Save
                      </Button>
                    ) : null}
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateEvent;
