"use client";
import { cn } from "@/lib/utils";
import { CreateTimetableSchema, CreateTimetableType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { toast } from "sonner";

const CreateTimetable = ({
  isCreateTimetableDialogOpen,
  setIsCreateTimetableDialogOpen,
  user,
}: {
  isCreateTimetableDialogOpen: any;
  setIsCreateTimetableDialogOpen: any;
  user: any;
}) => {
  const queryClient = useQueryClient();

  const form = useForm<CreateTimetableType>({
    resolver: zodResolver(CreateTimetableSchema),
    defaultValues: {
      title: "My Timetable",
    },
  });

  const createTimetableMution = useMutation({
    mutationKey: ["createTimetable"],
    mutationFn: (data: CreateTimetableType) =>
      fetch("/api/v1/create/timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    onMutate: () => {
      setIsCreateTimetableDialogOpen(false);
      toast.loading("Creating Timetable...");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["timetables"] });
      toast.dismiss();
      toast.success("Timetable Created Successfully!");
    },
  });

  const onSubmit: SubmitHandler<CreateTimetableType> = async (data) => {
    data.user = user;
    createTimetableMution.mutateAsync(data);
    setIsCreateTimetableDialogOpen(false);
  };

  return (
    <>
      <Drawer
        open={isCreateTimetableDialogOpen}
        onOpenChange={setIsCreateTimetableDialogOpen}
      >
        <DrawerContent className=" bg-white ">
          <DrawerHeader className="text-left">
            <DrawerTitle>Create a New Timetable</DrawerTitle>
          </DrawerHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter Timetable Title"
              fullWidth
              isInvalid={Boolean(form.formState.errors.title)}
              errorMessage={form.formState.errors.title?.message}
              {...form.register("title")}
            />

            <Button
              type="submit"
              isDisabled={form.formState.isSubmitting}
              color="success"
              variant="flat"
              fullWidth
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Timetable"}
            </Button>
          </form>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button color="danger" variant="flat">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateTimetable;
