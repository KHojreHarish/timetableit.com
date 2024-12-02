import type { Metadata } from "next";
import Footer from "@/components/ui/footer/Footer";
import { Exo_2 } from "next/font/google";
import Navbar2 from "@/components/ui/header/Navbar2";

export const metadata: Metadata = {
  title: "Online calendar for teams and groups-Calendar.Online",
  description: "Online calendar for teams and groups-Calendar.Online",
  icons: {
    icon: "Favicon.png",
  },
};

const exo = Exo_2({ subsets: ["latin"], weight: "500" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`bg-[#F3F6FB] ${exo.className}`}>{children}</div>;
}
