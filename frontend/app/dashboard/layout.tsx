"use client"

import { UserProvider } from "@/context/UserContext";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <UserProvider>
          <div className="flex bg-white min-h-screen">
            <Sidebar />
            <main className="py-20 px-60">
              {children}
            </main>
          </div>
        </UserProvider>
    </>
  );
}