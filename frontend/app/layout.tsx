import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import { UserProvider } from "@/context/UserContext";
import Footer from "@/components/common/footer";


export const metadata: Metadata = {
  title: "Food Waste Management",
  description: "By Pritam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navbar />
          <div className="min-h-screen bg-[#d7eccb]">
            {children}
          </div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}