"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const Sidebar = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  return (
    <div className="w-60 bg-white border-r border-gray-200 flex flex-col h-screen fixed z-20">
      <div className="overflow-auto h-full flex flex-col pt-16">
        <h1 className="text-xl font-semibold p-4">Dashboard</h1>
        <hr className="border-gray-200" />
        <p className="text-md font-medium p-4">Hey, {user?.username ?? ""}</p>
        <hr className="border-gray-200" />
        <nav className="flex-grow">
          <ul>
            <li>
              <Link
                href="/dashboard/donate"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Donate
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/get-donations"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Get-Donations
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/your-donations"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Your-Donations
              </Link>
            </li>
          </ul>
        </nav>
        <hr className="border-gray-200" />
        <button
          onClick={() => setLogoutDialogOpen(true)}
          className="flex items-center px-4 py-2 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Logout
        </button>
      </div>
      {logoutDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setLogoutDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
