"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { DateTimePicker } from "@/components/ui/datetime-picker";
import { CreateClassSchema, CreateClassType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ClassFormModal = ({
  isDialogOpen,
  setIsDialogOpen,
  subTimetables,
  timetableId,
  mode = "create",
  eventData,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  subTimetables: { id: string; name: string; color: string }[];
  timetableId: string;
  mode?: "create" | "update" | "view";
  eventData?: Partial<CreateClassType>;
}) => {
  const isReadOnly = mode === "view";

  // React Query mutation
  const { mutate, isPending } = useMutation({
    mutationKey: ["Class"],
    mutationFn: async (data: CreateClassType) => {
      const res =
        mode === "create"
          ? await fetch(`/api/v1/create/class`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ classData: data, timetableId }),
            })
          : await fetch(`/api/v1/update/class`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                subtimetableId: eventData?.subTimetable,
                eventId: eventData?.id,
                classData: data,
                timetableId,
              }),
            });

      !res.ok && toast.error("something went wrong");
      if (!res.ok) throw new Error("Failed to submit class");
      return res.json();
    },
    onSuccess: (data) => {
      data.success &&
        toast.success(
          mode === "create"
            ? "Class created successfully!"
            : "Class updated successfully!"
        );
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  // React Hook Form setup
  const form = useForm<CreateClassType>({
    resolver: zodResolver(CreateClassSchema),
    defaultValues: {
      title: eventData?.title || "",
      teacher: eventData?.teacher || "",
      description: eventData?.description || "",
      start: eventData?.start || new Date(),
      end: eventData?.end || new Date(),
      isAllDay: eventData?.isAllDay || false,
      subTimetable: eventData?.subTimetable || "",
    },
    mode: "all",
  });

  // Form submission handler
  const handleFormSubmit = (data: CreateClassType) => {
    if (mode === "view") return;
    mutate(data);
  };

  return (
    <Modal
      isOpen={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      scrollBehavior="inside"
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {mode === "create"
                ? "Create a New Class"
                : mode === "update"
                ? "Update Class"
                : "View Class Details"}
            </ModalHeader>

            <ModalBody>
              {" "}
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleFormSubmit)}
                    className="space-y-6"
                  >
                    {/* Subject Field */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isReadOnly}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className=" bg-white">
                              <SelectItem value="math">Mathematics</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="history">History</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Teacher Field */}
                    <FormField
                      control={form.control}
                      name="teacher"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teacher</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isReadOnly}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className=" bg-white">
                              <SelectItem value="smith">Mr. Smith</SelectItem>
                              <SelectItem value="johnson">
                                Ms. Johnson
                              </SelectItem>
                              <SelectItem value="williams">
                                Mrs. Williams
                              </SelectItem>
                              <SelectItem value="brown">Dr. Brown</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Start and End Date/Time Fields */}
                    <FormField
                      control={form.control}
                      name="start"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date & Time</FormLabel>
                          <DateTimePicker {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="end"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date & Time</FormLabel>
                          <DateTimePicker {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* All-Day Switch */}
                    <FormField
                      control={form.control}
                      name="isAllDay"
                      render={({ field }) => (
                        <Switch
                          {...field}
                          disabled={isReadOnly}
                          classNames={{
                            base: cn(
                              "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                              "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                              "data-[selected=true]:border-primary "
                            ),
                            wrapper:
                              "p-0 h-4 overflow-visible group-data-[selected=true]:bg-green-400 ",
                            thumb: cn(
                              "w-6 h-6 border-2 shadow-lg",
                              "group-data-[hover=true]:border-primary",
                              //selected
                              "group-data-[selected=true]:ml-6",
                              // pressed
                              "group-data-[pressed=true]:w-7",
                              "group-data-[selected]:group-data-[pressed]:ml-4 "
                            ),
                          }}
                        >
                          All day
                        </Switch>
                      )}
                    />

                    {/* Sub-timetable Selector */}
                    <FormField
                      control={form.control}
                      name="subTimetable"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sub-timetable</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isReadOnly}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select standard" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className=" bg-white">
                              {subTimetables.map((sub) => (
                                <SelectItem key={sub.id} value={sub.id}>
                                  {sub.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description Field */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <Textarea
                            {...field}
                            placeholder="Add class details"
                            disabled={isReadOnly}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Modal Footer */}

                    {mode !== "view" && (
                      <ModalFooter>
                        <Button variant="flat" color="danger" onClick={onClose}>
                          Cancel
                        </Button>
                        <Button
                          variant="flat"
                          color="success"
                          type="submit"
                          disabled={isPending}
                        >
                          {mode === "create" ? "Create Class" : "Update Class"}
                        </Button>
                      </ModalFooter>
                    )}
                  </form>
                </Form>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ClassFormModal;
