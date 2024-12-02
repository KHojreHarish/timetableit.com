"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Input,
  Spacer,
} from "@nextui-org/react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { auth, GoogleProvider } from "@/app/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { CiWarning } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Link from "next/link";
import Loader from "@/components/loader";
import { SignupSchema, SignupType } from "@/schemas";

const SignupPage = () => {
  // State management
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isPassVisible, setIsPassVisible] = useState(false);

  // Form setup
  const form = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Authentication state check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/timetables");
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Form submission handler
  const onSubmit: SubmitHandler<SignupType> = async (data) => {
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(result.user, { displayName: data.name });
      router.push("/home");
    } catch (err) {
      handleAuthError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, GoogleProvider);
      router.push("/home");
    } catch (error) {
      toast.warning("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // Error handling function
  const handleAuthError = (err: any) => {
    const errorCode = err.code;
    if (errorCode === "auth/email-already-in-use") {
      form.setError("email", {
        type: "invalid",
        message: "Email already in use. Please use a different email.",
      });
    } else {
      toast.warning("Something went wrong. Please try again.");
    }
  };

  // Render loading state
  if (isLoading) return <Loader />;

  return (
    <main className="max-w-full flex items-center justify-center h-screen">
      <div className="w-[30rem] max-w-full mt-[10vh] md:mt-4">
        <Card shadow="sm" className="mt-[5%] m-2">
          <CardHeader className="font-bold text-base sm:text-2xl w-full flex items-center justify-center">
            Sign Up
          </CardHeader>
          <CardBody className="flex items-center justify-center min-[445px]:px-[15%]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          id="name"
                          label="Name"
                          labelPlacement="outside"
                          placeholder="Enter your Name"
                          fullWidth
                          radius="sm"
                          isDisabled={isLoading}
                          isInvalid={Boolean(
                            form.formState.errors.name?.message
                          )}
                          errorMessage={form.formState.errors.name?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          id="email"
                          label="Email"
                          labelPlacement="outside"
                          placeholder="johndoe@example.com"
                          fullWidth
                          radius="sm"
                          isDisabled={isLoading}
                          isInvalid={Boolean(form.formState.errors.email)}
                          errorMessage={form.formState.errors.email?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type={isPassVisible ? "text" : "password"}
                          id="password"
                          label="Password"
                          labelPlacement="outside"
                          placeholder="****************"
                          fullWidth
                          endContent={
                            isPassVisible ? (
                              <EyeOff
                                onClick={() => setIsPassVisible(false)}
                                className="cursor-pointer"
                              />
                            ) : (
                              <Eye
                                onClick={() => setIsPassVisible(true)}
                                className="cursor-pointer"
                              />
                            )
                          }
                          isDisabled={isLoading}
                          radius="sm"
                          isInvalid={Boolean(
                            form.formState.errors.password?.message
                          )}
                          errorMessage={form.formState.errors.password?.message}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.email?.type === "invalid" &&
                  form.formState.errors.password?.type === "invalid" && (
                    <Chip
                      variant="flat"
                      color="danger"
                      radius="sm"
                      size="lg"
                      startContent={<CiWarning className="h-5 w-5" />}
                      className="min-w-full p-2 text-sm"
                    >
                      Invalid Credentials
                    </Chip>
                  )}
                <Button
                  variant="flat"
                  type="submit"
                  fullWidth
                  radius="full"
                  color="success"
                  isLoading={isLoading}
                  className="mt-[1vh]"
                >
                  Sign Up
                </Button>
              </form>
            </Form>
            <Spacer y={4} />
            <p className="text-xs text-[#818181]">Or, signup with your email</p>
            <Spacer y={3} />
            <Button
              variant="bordered"
              fullWidth
              radius="full"
              color="primary"
              className="text-black"
              isDisabled={isLoading}
              startContent={<FcGoogle className="w-5 h-5" />}
              onClick={handleGoogleLogin}
            >
              Log in with Google
            </Button>
            <Spacer y={3} />
            {/* Additional login buttons for other platforms can go here */}
          </CardBody>
          <CardFooter className="w-full flex items-center justify-center">
            <p className="text-xs text-[#818181]">
              Already have an account?
              <Link href="/login" className="text-[#4C40ED]">
                {" "}
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default SignupPage;
