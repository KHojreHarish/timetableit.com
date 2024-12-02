"use client";
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useState } from "react";

const CreateChildCalendar = ({
  isCreateChildCalendarOpen,
  setIsCreateChildCalendarOpen,
  calendarId,
  calendarData,
  onSubmit,
}: any) => {
  const id = calendarId;
  const [name, setName] = useState(calendarData.accessName || "Modifier");
  const [password, setPassword] = useState(calendarData.password);
  const [isActive, setIsActive] = useState(calendarData.isActive);
  const [permission, setPermission] = useState(
    calendarData.accessLevel || "admin"
  );

  const handleSubmit = () => {
    onSubmit({
      id,
      accessName: name ? name : "My calendar(default)",
      password,
      isActive: isActive ? isActive : "true",
      accessLevel: permission ? permission : "read",
    });
  };
  return (
    <>
      <Modal
        size="xl"
        isDismissable={false}
        isOpen={isCreateChildCalendarOpen}
        onOpenChange={setIsCreateChildCalendarOpen}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Access link settings
              </ModalHeader>
              <ModalBody>
                <form>
                  <Card className=" mb-4">
                    <CardBody>
                      <h1 className=" font-bold ">Access Link</h1>
                      <Link href={`/${id}`} isExternal showAnchorIcon>
                        {`https://calendar.online/${id}`}
                      </Link>
                    </CardBody>
                  </Card>
                  <Input
                    autoFocus
                    label="Name"
                    placeholder="Enter a good name"
                    variant="bordered"
                    labelPlacement="outside"
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    type="password"
                    variant="bordered"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Select
                    variant="bordered"
                    label="Active"
                    labelPlacement="outside"
                    placeholder="select whether link is "
                    defaultSelectedKeys={[isActive]}
                    onChange={(e) => setIsActive(e.target.value)}
                    required
                    isRequired
                    isDisabled={calendarData.type === "parent" ? true : false}
                  >
                    <SelectItem key={"true"}> Yes</SelectItem>
                    <SelectItem key={"false"}>NO</SelectItem>
                  </Select>
                  <Select
                    variant="bordered"
                    label="Permission"
                    labelPlacement="outside"
                    placeholder="select link access permissions "
                    defaultSelectedKeys={[permission]}
                    onChange={(e) => setPermission(e.target.value)}
                    required
                    isDisabled={calendarData.type === "parent" ? true : false}
                  >
                    <SelectItem key={"admin"}> Admin</SelectItem>
                    <SelectItem key={"modifier"}>Modifier</SelectItem>
                    <SelectItem key={"read"}>Read</SelectItem>
                  </Select>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="success"
                  onPress={() => {
                    handleSubmit();
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateChildCalendar;
