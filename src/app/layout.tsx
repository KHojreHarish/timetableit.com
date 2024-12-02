import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/ui/header/Navbar";
import Footer from "@/components/ui/footer/Footer";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { Exo_2 } from "next/font/google";
import ReactQueryProvider from "@/lib/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Share your school timetable easily",
  description: "Share your school timetable easily",
  icons: {
    icon: "/Favicon.png",
  },
};

const exo = Exo_2({ subsets: ["latin"], weight: "500" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`bg-gradient-to-r from-violet-50 to-purple-100 max-w-[100vw] ${exo.className}`}
        suppressHydrationWarning
      >
        <Providers>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </Providers>
        <Toaster richColors />
        {/* <Footer /> */}
      </body>
    </html>
  );
}
