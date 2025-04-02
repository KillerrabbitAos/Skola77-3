"use client";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SignInPrompt } from "@/components/signInPrompt";
import { LeftArrowButton } from "@/components/leftArrowButton";
import { MagnifyingGlass } from "@/components/magnifyingGlass";

function NavHeadingProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const user = session?.user;
  const redirectToProfile = () => {
    window.location.href = "/profile";
  };
  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) return null;
  if (!user) return <SignInPrompt />;

  return (
    <>
      <div className="w-full justify-center items-center h-20 ">
        <div className="grid grid-cols-5 items-center h-10">
          <div className="flex items-center h-full items-center ">
            <LeftArrowButton
            className="cursor-pointer"
              onClick={() => {
                window.location.replace("/");
              }}
            />
          </div>
          <div className="flex col-span-3 items-center justify-center py-10 h-full">
            <div className="relative w-full h-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlass />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full h-full px-4 py-2 pl-10 bg-gray-100 classic:bg-green-200 classic:border-1 rounded-lg text-gray-700 outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end items-center">
            <Image
              onClick={redirectToProfile}
              className="light:border-[#121212] dark:border-lightgray cursor-pointer border-2 rounded-full"
              src={user?.image || "/default-profile.png"}
              alt={user?.name || "User profile picture"}
              width={(4 / 6) * 80}
              height={(4 / 6) * 80}
            />
          </div>
        </div>
      </div>
      {children}
    </>
  );
}

export default NavHeadingProvider;
