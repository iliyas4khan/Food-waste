"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import loginImage from "@/components/assets/login.jpg";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { setUser } = useUser(); // Get the setUser function from context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous error message
    setErrorMessage("");
    console.log(process.env.NEXT_PUBLIC_API_URL);

    const response = await fetch(`http://localhost:8080/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      // Store user data in UserContext
      setUser(data.user);

      // Log user data to confirm it's set
      console.log("User data set in context:", data.user);

      // Redirect to the dashboard
      router.push("/dashboard");
    } else {
      // Handle error and display message
      const errorData = await response.json();
      setErrorMessage(errorData.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full pt-16">
      <div className="flex w-full h-full md:w-[95vw] lg:w-[75vw] md:h-[80vh] md:rounded-xl md:overflow-hidden md:shadow-xl">
        <div className="w-1/2 md:flex flex-col justify-center items-center hidden">
          <Image
            src={loginImage.src}
            alt="Login Page"
            height={400}
            width={400}
            className="h-full w-full"
          />
        </div>
        <div className="md:w-1/2 flex justify-center items-center bg-[#a0ca82] w-full">
          <div className="md:bg-[#ffffff20] md:backdrop-blur-xl rounded-lg md:shadow-lg md:p-8 md:w-96 w-72">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
                <div className="flex justify-end mt-1">
                  <a
                    href="#"
                    className="text-sm text-[#2c5048] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#2c5048] text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </form>
            <p className="mt-8 text-center text-sm text-[#2c5048]">
              Are you new?{" "}
              <a href="/register" className="text-white hover:underline">
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
