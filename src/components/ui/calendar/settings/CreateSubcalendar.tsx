import { CreateSubCalendarProps } from "@/types/calendarTypes";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  cn,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "../../label";

const CreateSubCalendar = ({
  isSubcalendarDialogOpen,
  setisSubcalendarDialogOpen,
}: // subCalendarData,
{
  isSubcalendarDialogOpen: any;
  setisSubcalendarDialogOpen: any;
  onSubmit: any;
}) => {
  const [name, setName] = useState<string>("sub(default)");
  const [color, setColor] = useState<string>("#55AA77");
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(true);

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
        isOpen={isSubcalendarDialogOpen}
        onOpenChange={() => setisSubcalendarDialogOpen(false)}
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
                Create New SubCalendar
              </ModalHeader>
              <ModalBody>
                <form>
                  <Label className=" text-2xl mb-2 " aria-label="Event-title">
                    Title
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    size="lg"
                    onChange={(e) => {
                      setName(e.target.value);
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
                    placeholder="Enter sub-calendar title"
                    defaultValue={name}
                    variant="bordered"
                    errorMessage="Please enter Good Title"
                  />
                  <Label
                    className=" text-xl mb-2 mt-4 "
                    aria-label="Event-title"
                  >
                    {`BackGround Color- ${color} `}
                  </Label>
                  <Input
                    type="color"
                    id="color"
                    size="lg"
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                    isRequired
                    defaultValue={color}
                    variant="underlined"
                    errorMessage="Please enter the valid hex "
                  />

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
                    id="isVisible"
                    isSelected={isVisible}
                    onChange={(e) => {
                      setIsVisible(e.target.checked);
                    }}
                    className=" m-4 ml-1"
                  >
                    Visible
                  </Switch>
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
                    id="isActive"
                    isSelected={isActive}
                    onChange={(e) => {
                      setIsActive(e.target.checked);
                    }}
                    className=" m-4 ml-1"
                  >
                    Active
                  </Switch>

                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Abort
                    </Button>
                    <Button color="success" type="submit">
                      Create
                    </Button>
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

export default CreateSubCalendar;
