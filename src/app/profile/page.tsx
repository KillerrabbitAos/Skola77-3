"use client";

import React, { useEffect, useState } from "react";
import { LargeProfilePicture } from "@/components/largeProfilePicture";
import { useSession, signOut } from "next-auth/react";

function Page() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const user = session?.user;

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading || !user) return null;

  return (
    <div className="mt-3">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        <p className="text-gray-600">{user.SBucks}</p>
        <button
          className="bg-amber-100 p-5 rounded text-black"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Page;
