"use client";
import {
  AppWindow,
  BarChart3,
  Bell,
  Calendar,
  Clock4,
  CloudDownload,
  CloudUpload,
  CodeXml,
  Eye,
  LucideUsersRound,
  Menu,
  MessageSquare,
  Settings,
  SquareUserRound,
  Users,
  WalletCards,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { usePathname, useRouter } from "next/navigation";

export function MenuBar({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="flex w-full max-w-[100vw] flex-col">
      <header className="sticky top-0 flex h-16 w-screen max-h-full max-w-full items-center gap-4 border-b  px-4 md:px-6 z-10 bg-[#f3f6fb6d] ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 ">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href={`/c/${id}`}
              prefetch={false}
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Image
                as={NextImage}
                width={250}
                height={150}
                src="/Logo.png"
                alt="timetableit.com logo"
              />
            </Link>
          </nav>
          {/* navbar on mobile device */}

          <SheetContent side="left" className=" bg-white overflow-x-auto ">
            <nav className="grid gap-4 mt-4 text-lg font-light  ">
              <button onClick={() => router.push(`/c/${id}`)}>
                <Image
                  as={NextImage}
                  width={300}
                  height={200}
                  src="/Logo.png"
                  alt="tiemtableit.com logo"
                />
              </button>
              <SheetTrigger>
                <button
                  onClick={() => {
                    router.replace(`/c/${id}/settings/sub-timetable`);
                  }}
                  className={` flex gap-3 items-center mt-4 h-9 w-full rounded text-muted-foreground hover:text-foreground text-start pl-6 ${
                    path === `/c/${id}/settings/sub-timetable`
                      ? " bg-[#5B6C7D] text-white"
                      : ""
                  } `}
                >
                  <Calendar />
                  Sub-timetable
                </button>
              </SheetTrigger>

              <SheetTrigger>
                <button
                  onClick={() => {
                    router.replace(`/c/${id}/settings/team`);
                  }}
                  className={` flex gap-3 items-center h-9 w-full rounded text-muted-foreground hover:text-foreground text-start pl-6 ${
                    path === `/c/${id}/settings/team`
                      ? " bg-[#5B6C7D] text-white"
                      : ""
                  } `}
                >
                  <Users />
                  Team
                </button>
              </SheetTrigger>

              <SheetTrigger>
                <button
                  onClick={() => {
                    router.replace(`/c/${id}/settings/views`);
                  }}
                  className={` flex gap-3 items-center h-9 w-full rounded text-muted-foreground hover:text-foreground text-start pl-6 ${
                    path === `/c/${id}/settings/views`
                      ? " bg-[#5B6C7D] text-white"
                      : ""
                  } `}
                >
                  <Eye />
                  Views
                </button>
              </SheetTrigger>

              <SheetTrigger>
                <button
                  onClick={() => {
                    router.replace(`/c/${id}/settings/time`);
                  }}
                  className={` flex gap-3 items-center h-9 w-full rounded text-muted-foreground hover:text-foreground text-start pl-6 ${
                    path === `/c/${id}/settings/time`
                      ? " bg-[#5B6C7D] text-white"
                      : ""
                  } `}
                >
                  <Clock4 />
                  Time
                </button>
              </SheetTrigger>

              <SheetTrigger>
                <button
                  onClick={() => {
                    router.replace(`/c/${id}/settings/teachers`);
                  }}
                  className={` flex gap-3 items-center h-9 w-full rounded text-muted-foreground hover:text-foreground text-start pl-6 ${
                    path === `/c/${id}/settings/teachers`
                      ? " bg-[#5B6C7D] text-white"
                      : ""
                  } `}
                >
                  <LucideUsersRound />
                  Teachers
                </button>
              </SheetTrigger>

              <SheetTrigger>
                <button
                  onClick={() => {
                    router.replace(`/c/${id}/settings/statistics`);
                  }}
                  className={` flex gap-3 items-center h-9 w-full rounded text-muted-foreground hover:text-foreground text-start pl-6 ${
                    path === `/c/${id}/settings/statistics`
                      ? " bg-[#5B6C7D] text-white"
                      : ""
                  } `}
                >
                  <BarChart3 />
                  Statistics
                </button>
              </SheetTrigger>
              <SheetTrigger>
                <button
                  onClick={() => {
                    router.replace(`/c/${id}/settings/export`);
                  }}
                  className={` flex gap-3 items-center h-9 w-full rounded text-muted-foreground hover:text-foreground text-start pl-6 ${
                    path === `/c/${id}/settings/export`
                      ? " bg-[#5B6C7D] text-white"
                      : ""
                  } `}
                >
                  <CloudUpload />
                  Export
                </button>
              </SheetTrigger>

              <SheetTrigger>
                <button
                  onClick={() => {
                    router.replace(`/c/${id}/settings/import`);
                  }}
                  className={` flex gap-3 items-center h-9 w-full rounded text-muted-foreground hover:text-foreground text-start pl-6 ${
                    path === `/c/${id}/settings/import`
                      ? " bg-[#5B6C7D] text-white"
                      : ""
                  } `}
                >
                  <CloudDownload />
                  Import
                </button>
              </SheetTrigger>

              <SheetTrigger>
                <button
                  onClick={() => {
                    router.replace(`/c/${id}/settings`);
                  }}
                  className={` flex gap-3 items-center h-9 w-full rounded text-muted-foreground hover:text-foreground text-start pl-6 ${
                    path === `/c/${id}/settings`
                      ? " bg-[#5B6C7D] text-white"
                      : ""
                  } `}
                >
                  <Settings />
                  Settings
                </button>
              </SheetTrigger>
            </nav>
          </SheetContent>
        </Sheet>
        {/* <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className=" ml-auto  ">
            <div className="relative flex gap-4 ">
              <h1 className=" hidden sm:block ">demo@gmail.com</h1>
              <Button
                variant="outline"
                size="sm"
                className=" hidden sm:block ml-auto text-amber-300 gap-1.5 text-sm rounded   "
              >
                Premium
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="ml-auto gap-1.5 text-sm rounded hover:bg-[#476A9F] hover:text-white "
              >
                <Link href={`/${id}`} prefetch={false} passHref legacyBehavior>
                  Go to timetable
                </Link>
              </Button>
            </div>
          </div>
        </div> */}
      </header>

      <main className=" flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 md:gap-8 w-full p-4 ">
        <div className="grid gap-6">{children}</div>
      </main>
    </div>
  );
}
