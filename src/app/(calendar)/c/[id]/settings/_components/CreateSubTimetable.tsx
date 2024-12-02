import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CreateSubTimetableSchema, CreateSubTimetableType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateSubTimetable } from "../../dbUtils";
import { toast } from "sonner";
import { Button } from "@nextui-org/react";

const CreateSubTimetable = ({
  isCreateSubTimetableDialogOpen,
  setIsCreateSubTimetableDialogOpen,
  timetableId,
}: any) => {
  const { mutate } = useCreateSubTimetable();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Form initialization with default values
  const form = useForm<CreateSubTimetableType>({
    resolver: zodResolver(CreateSubTimetableSchema),
    defaultValues: {
      name: "XII",
      color: "#55AA77",
    },
  });

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Form submission handler
  const onSubmit: SubmitHandler<CreateSubTimetableType> = async (data) => {
    mutate({ subTimetableData: data, timetableId });
    setIsCreateSubTimetableDialogOpen(false);
  };

  return (
    <Dialog
      open={isCreateSubTimetableDialogOpen}
      onOpenChange={() => setIsCreateSubTimetableDialogOpen(false)}
    >
      <DialogContent
        className={cn(
          ` bg-white`,
          windowWidth <= 768 ? "w-full h-full" : "max-w-3xl "
        )}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl">Create New SubCalendar</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter sub-calendar title"
                      className="text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">
                    Background Color - {field.value}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="color"
                      {...field}
                      className="h-12 cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="flat"
                color="danger"
                onClick={() => setIsCreateSubTimetableDialogOpen()}
              >
                Abort
              </Button>
              <Button type="submit" variant="flat" color="success">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSubTimetable;
