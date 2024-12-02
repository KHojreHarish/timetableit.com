"use client";

import { useState, createContext, useContext, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Clock,
  Users,
  Zap,
  BarChart,
  Settings,
  LogOut,
  PlusCircle,
  User,
  Check,
  Moon,
  Sun,
} from "lucide-react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

export function LandingPageComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <header className="sticky top-0 z-50 w-full border-b bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                TimeTable Pro
              </span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                href="#features"
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                href="#pricing"
              >
                Pricing
              </Link>
              <Link
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                href="#about"
              >
                About
              </Link>
              <Link
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                href="#contact"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <Button className="hidden md:flex bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-full relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Create Timetable
                </span>
                <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shimmer" />
              </Button>
              {!isLoggedIn ? (
                <>
                  <Button variant="ghost" onClick={handleLogin}>
                    Log In
                  </Button>
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                    Sign Up
                  </Button>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900 dark:text-white">
                    Revolutionize Your{" "}
                    <span className="text-sky-600 dark:text-sky-400">Time</span>
                    table
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl">
                    Effortlessly create, manage, and optimize schedules with our
                    AI-powered timetable solution.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      className="flex-1"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 text-white"
                    >
                      Get Started
                    </Button>
                  </form>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Start your 14-day free trial. No credit card required.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="features"
            className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">
                Why Choose Our Timetable Solution?
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-2 bg-sky-100 dark:bg-sky-900 rounded-full">
                    <Zap className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Lightning Fast
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Generate complex schedules in seconds, not hours.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                    <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Collaborative
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Work together in real-time with your entire team.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-2 bg-teal-100 dark:bg-teal-900 rounded-full">
                    <BarChart className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Insightful Analytics
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Gain valuable insights to optimize your schedules.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-700">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Timetable Preview"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src="/placeholder.svg?height=310&width=550"
                  width="550"
                />
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
                      Experience the Future of Scheduling
                    </h2>
                    <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Our AI-powered timetable creator learns from your
                      preferences and optimizes for efficiency.
                    </p>
                  </div>
                  <ul className="grid gap-2 py-4">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                      <span className="text-gray-900 dark:text-white">
                        Intelligent conflict resolution
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                      <span className="text-gray-900 dark:text-white">
                        Customizable constraints and rules
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                      <span className="text-gray-900 dark:text-white">
                        Automatic resource allocation
                      </span>
                    </li>
                  </ul>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-700 disabled:pointer-events-none disabled:opacity-50"
                      href="#"
                    >
                      Get Started
                    </Link>
                    <Link
                      className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                      href="#"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="pricing"
            className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800"
          >
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 dark:text-white">
                Pricing Plans
              </h2>
              <div className="grid gap-6 lg:grid-cols-3">
                {[
                  {
                    name: "Basic",
                    price: "$9",
                    features: [
                      "Up to 50 schedules",
                      "Basic analytics",
                      "Email support",
                    ],
                  },
                  {
                    name: "Pro",
                    price: "$29",
                    features: [
                      "Unlimited schedules",
                      "Advanced analytics",
                      "Priority support",
                      "API access",
                    ],
                  },
                  {
                    name: "Enterprise",
                    price: "Custom",
                    features: [
                      "Custom integrations",
                      "Dedicated account manager",
                      "On-premise deployment option",
                      "24/7 phone support",
                    ],
                  },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className="flex flex-col p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                      {plan.price}
                      <span className="text-sm font-normal">
                        {plan.price !== "Custom" && "/month"}
                      </span>
                    </p>
                    <ul className="mb-6 space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-sky-500 dark:text-sky-400 mr-2" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-auto"
                      variant={plan.name === "Pro" ? "default" : "outline"}
                    >
                      {plan.price === "Custom"
                        ? "Contact Sales"
                        : "Get Started"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
                    Ready to Transform Your Scheduling?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join thousands of satisfied users and experience the power
                    of our AI-driven timetable solution.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input
                      className="flex-1"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Button
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 text-white"
                    >
                      Get Started
                    </Button>
                  </form>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Start your 14-day free trial. No credit card required.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            © 2023 TimeTable Pro. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
    </ThemeProvider>
  );
}
