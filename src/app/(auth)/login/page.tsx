"use client";
import { auth, GoogleProvider } from "@/app/firebaseConfig";
import Loader from "@/components/loader";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { LoginSchema, LoginType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
  Input,
  Spacer,
} from "@nextui-org/react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiWarning } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const LoginPage = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Set loading to true initially
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is logged in, redirect to home and set the user state
        router.push("/home");
        setUser(user);
      } else {
        // If no user is logged in, stop loading
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const [isPassVisible, setIsPassVisible] = useState(false);
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user: any = userCredential.user;
      user.accessToken && router.push("/home");
    } catch (error: any) {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        form.setError("email", {
          type: "invalid",
        });
        form.setError("password", {
          type: "invalid",
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      const user: any = result.user;
      user.accessToken && router.push("/timetables");
    } catch (error: any) {
      toast.warning("Something went wrong.");
    }
    setIsLoading(false);
  };

  // If still loading, render a loading state
  if (isLoading) return <Loader />;

  // If user is already logged in, do not render the login form
  if (user) return null;

  return (
    <main className="max-w-full flex items-center justify-center h-screen">
      <div className="w-[30rem] max-w-full mt-[10vh] md:mt-4">
        <Card shadow="sm" className="mt-[5%] m-2">
          <CardHeader className="font-bold text-base sm:text-2xl w-full flex items-center justify-center">
            LogIn
          </CardHeader>
          <CardBody className="flex items-center justify-center min-[445px]:px-[15%]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
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
                          defaultValue={form.formState.defaultValues?.email}
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
                          defaultValue={form.formState.defaultValues?.password}
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
                  className="mt-[1vh]"
                >
                  Log In
                </Button>
              </form>
            </Form>

            <Spacer y={4} />
            <p className="text-xs text-[#818181]">Or, login with your email</p>
            <Spacer y={3} />
            <Button
              variant="bordered"
              fullWidth
              radius="full"
              color="primary"
              className="text-black"
              isDisabled={isLoading}
              startContent={<FcGoogle className="w-5 h-5" />}
              onClick={() => handleGoogleLogin()}
            >
              Log in with Google
            </Button>
            <Spacer y={3} />

            {/* Add other social login buttons here */}

            <CardFooter className="w-full flex items-center justify-center">
              <p className="text-xs text-[#818181]">
                Don&apos;t have an account?
                <Link href="/signup" className="text-[#4C40ED]">
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
    </main>
  );
};

export default LoginPage;
