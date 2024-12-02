import { MenuBar } from "@/components/ui/calendar/settings/Menu";
import type { Metadata } from "next";
// import { Providers } from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Setting",
  description: "Online timetable for Schools and Institutes",
  icons: {
    icon: "/Favicon.png",
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    id: string;
  };
}>) {
  return (
    <div lang="en" className="">
      <MenuBar id={params.id}>{children}</MenuBar>
      <Toaster richColors />
    </div>
  );
}
