"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SearchUserSchema, SearchUserType } from "@/schemas";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
  User,
} from "@nextui-org/react";
import { CircleUser, EllipsisVerticalIcon, InfoIcon } from "lucide-react";
import { toast } from "sonner";

/**
 * Main Teams Page component
 * Displays a list of users and provides functionality for adding members
 * to a timetable with specific roles (Admin, Modifier, Reader, etc.)
 */
const TeamsPage = ({ params }: { params: { id: string } }) => {
  const timetableId = params.id;

  // initialize react query client
  const queryClient = useQueryClient();

  // State to control the "Add Member" modal dialog
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);

  // State to control the "Set Specific Role for Subcalendar" dialog
  const [isSpecificRoleDialogOpen, setIsSpecificRoleDialogOpen] =
    useState(false);

  // Store the selected roles for each sub-timetable
  const [roles, setRoles] = useState<{ [key: string]: string }>({});

  const teamQuery = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const response = await fetch(
        `/api/v1/fetch/team?timetableId=${timetableId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch booking details");
      }

      return response.json();
    },
    enabled: !!timetableId,
  });

  // React Hook Form setup with Zod validation schema
  const form = useForm<SearchUserType>({
    resolver: zodResolver(SearchUserSchema),
    defaultValues: { email: "" },
  });

  const inviteMutation = useMutation({
    mutationKey: ["team"],
    mutationFn: async (data: any) => {
      const response = await fetch("/api/v1/sharetimetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    },
    onSuccess(data) {
      if (data.success == false && data.message == "User not found") {
        form.setError("email", {
          type: "NOT FOUND",
          message: "User does not exists",
        });
      } else if (
        data.success == false &&
        data.message == "User already has access to this timetable"
      ) {
        form.setError("email", {
          type: "EXISTS",
          message: "user is already a team member",
        });
      } else if (
        data.success == true &&
        data.message == "Timetable successfully shared with user"
      ) {
        toast.success("User invited successfully.");
      } else {
        toast.error("something went wrong");
      }
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
  });

  // Submit handler for inviting a user with their role and assigned sub-timetables
  const onSubmit: SubmitHandler<SearchUserType> = async (data) => {
    data.roles = roles;
    data.timetableId = timetableId;
    inviteMutation.mutateAsync(data);
  };

  // Fetch sub-timetables for the given timetable
  const subtimetablesMutation = useMutation({
    mutationKey: ["subtimetables", timetableId],
    mutationFn: async () => {
      const res = await fetch(
        `/api/v1/fetch/allsubtimetables?timetableId=${timetableId}`
      );
      return res.json();
    },
  });

  // Handle changing the main timetable role
  const handleTimetableRoleChange = (value: string) => {
    if (value === "specific") {
      setIsSpecificRoleDialogOpen(true); // Open the dialog if the user selects "specific"
      subtimetablesMutation.mutateAsync(); // Fetch sub-timetables when the role is "specific"
    } else {
      setIsSpecificRoleDialogOpen(false); // Close the dialog for other roles
    }
  };

  // Handle changing the role for each specific sub-timetable
  const handleRoleChange = (subtimetableId: string, selectedRole: string) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [subtimetableId]: selectedRole, // Update role for the sub-timetable
    }));
  };

  // Revoking access
  // Delete the user access mutation
  const revokeAccessMutation = useMutation({
    mutationKey: ["team"],
    mutationFn: async (data: { email: string; timetableId: string }) => {
      const response = await fetch("/api/v1/revokesharedtimetable", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    },
    onSuccess(data) {
      if (
        data.success == false &&
        data.message == "User does not have access to this timetable"
      ) {
        toast.error("User does not have access to this timetable");
      } else if (
        data.success == true &&
        data.message == "User access removed successfully"
      ) {
        toast.success("User access removed successfully.");
      } else {
        toast.error("something went wrong");
      }
      queryClient.invalidateQueries({ queryKey: ["team"] });
    },
  });

  // Handle revoking access for the timetable
  const handleRevokingTimetableAccess = (data: {
    email: string;
    timetableId: string;
  }) => {
    revokeAccessMutation.mutateAsync(data);
  };

  return (
    <>
      {/* Page header with "Add" button */}
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold text-gray-600 text-2xl">Team</h1>
        <Button
          variant="flat"
          color="secondary"
          onClick={() => setIsAddMemberDialogOpen(true)}
        >
          +Add
        </Button>
      </div>

      {/* List of users (Placeholder data) */}
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        {/* User List - Placeholder */}
        {teamQuery.data &&
          teamQuery.data.teamMembers.map((teamMember: any, index: any) => (
            <div
              key={index}
              className="w-full flex items-center justify-between p-3 border-1 rounded-lg hover:shadow-xl"
            >
              <User name={teamMember.email} />
              <div className=" flex items-center justify-center gap-2 ">
                <Button variant="flat" color="warning">
                  {teamMember.role}
                </Button>

                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="flat" color="secondary">
                      <EllipsisVerticalIcon />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem
                      key="kick"
                      className="text-danger"
                      color="danger"
                      onClick={() =>
                        handleRevokingTimetableAccess({
                          email: teamMember.email,
                          timetableId: timetableId,
                        })
                      }
                    >
                      Kick Member
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          ))}
      </div>

      {/* Modal for adding a member */}
      <Modal
        isOpen={isAddMemberDialogOpen}
        onOpenChange={setIsAddMemberDialogOpen}
        placement="top-center"
        isDismissable={false}
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Member
              </ModalHeader>
              <ModalBody className="p-4">
                <div className="w-full">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="w-full">
                        {/* Email Input Field */}
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Input
                                  autoFocus
                                  fullWidth
                                  placeholder="enter user's email."
                                  variant="bordered"
                                  className="mb-4"
                                  isInvalid={!!form.formState.errors.email}
                                  errorMessage={
                                    form.formState.errors.email?.message
                                  }
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Role Select Field */}
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <Select
                                  aria-label="role"
                                  fullWidth
                                  placeholder="select user's role."
                                  description={
                                    <div className="flex items-center justify-end gap-1">
                                      <InfoIcon className="h-4 w-4" />
                                      remember role can&apos;t be changed later.
                                    </div>
                                  }
                                  variant="bordered"
                                  className="mb-4"
                                  isInvalid={!!form.formState.errors.role}
                                  errorMessage={
                                    form.formState.errors.role
                                      ?.message as string
                                  }
                                  {...field}
                                  onChange={(e) => {
                                    handleTimetableRoleChange(e.target.value);
                                    field.onChange(e.target.value); // Ensure form state is updated
                                  }}
                                  disallowEmptySelection
                                >
                                  <SelectItem key={"admin"}>Admin</SelectItem>
                                  <SelectItem key={"modifier"}>
                                    Modifier
                                  </SelectItem>
                                  <SelectItem key={"reader"}>Reader</SelectItem>
                                  <SelectItem key={"specific"}>
                                    Set Specific for Subcalendar
                                  </SelectItem>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* Show sub-timetable roles only when "specific" role is selected */}
                        {isSpecificRoleDialogOpen &&
                          (subtimetablesMutation.isPending ? (
                            <Spinner />
                          ) : (
                            <div className="p-4">
                              {subtimetablesMutation.data?.subTimetables.map(
                                (subtimetable: any) => (
                                  <div
                                    key={subtimetable.id}
                                    className="flex items-start justify-between"
                                  >
                                    <h1 className="flex items-center justify-center max-w-[60%] truncate text-gray-800">
                                      {/* Sub-timetable name with color */}
                                      <div
                                        className="min-w-4 min-h-8 max-h-full"
                                        style={{
                                          backgroundColor: `${subtimetable.color}`,
                                        }}
                                      />
                                      {subtimetable.name}
                                    </h1>

                                    {/* Sub-timetable Role Select */}
                                    <Select
                                      aria-label={`role for ${subtimetable.name}`}
                                      placeholder="Enter user's role"
                                      variant="bordered"
                                      className="w-[40%] mb-4"
                                      disallowEmptySelection
                                      value={roles[subtimetable.id] || ""}
                                      onChange={(e) =>
                                        handleRoleChange(
                                          subtimetable.id,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <SelectItem key={"admin"}>
                                        Admin
                                      </SelectItem>
                                      <SelectItem key={"modifier"}>
                                        Modifier
                                      </SelectItem>
                                      <SelectItem key={"reader"}>
                                        Reader
                                      </SelectItem>
                                    </Select>
                                  </div>
                                )
                              )}
                            </div>
                          ))}
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        fullWidth
                        variant="flat"
                        color="success"
                        isLoading={inviteMutation.isPending}
                      >
                        +Invite
                      </Button>
                    </form>
                  </Form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TeamsPage;
