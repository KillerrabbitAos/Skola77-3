"use client";

import React, { useEffect, useState } from "react";
import { SmallProfilePicture } from "@/components/smallProfilePicture";
import { useSession } from "next-auth/react";
import { SignInPrompt } from "@/components/signInPrompt";
import { LeftArrowButton } from "@/components/leftArrowButton";
import { SearchField } from "@/components/searchField";
import GroupCard from "@/components/requestCard";
import { useRouter } from "next/navigation";
import { Request } from "@prisma/client";
import { useGroupsStore, useGroupStore } from "@/lib/store";

function NavHeadingProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const searchFieldRef = React.useRef<HTMLInputElement>(null);
  const storedGroups = useGroupsStore((state) => state.groups);
  const setGroupsStore = useGroupsStore((state) => state.setGroups);
  const clearSelectedGroups = useGroupsStore((state) => state.clearGroups);
  const [resultedRequests, setResultedRequests] = useState<Request[]>([]);
  const router = useRouter();

  const user = session?.user;

  function resetSearchField() {
    if (searchFieldRef.current) {
      searchFieldRef.current.value = "";
    }
  }

  function searchRequests(event: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value;

    fetch(`/api/groups?q=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setResultedRequests(data);
        } else {
          setResultedRequests([]);
        }
      })
      .catch((error) => console.error("Error fetching requests:", error));
  }

  function redirectToRequest(request: Request) {
    useGroupStore.getState().setSelectedGroup(request);
    if (window.location.pathname !== "/request") {
      router.replace("/request?id=" + request.id);
    }
    window.location.href = `/request?id=${request.id}`;
    setResultedRequests([]);
    resetSearchField();
  }

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) return null;
  if (!user) return <SignInPrompt />;

  return (
    <>
      <div className="h-20 flex items-center">
        <div className="grid grid-cols-5 w-full">
          <div className="flex items-center justify-start">
            <LeftArrowButton onClick={() => router.replace("/")} />
          </div>
          <div className="flex col-span-3 items-center justify-center">
            <div className="relative w-full">
              <SearchField ref={searchFieldRef} onChange={searchRequests} />
              <div className="absolute top-full left-0 w-full z-10">
                {resultedRequests &&
                  resultedRequests.map((request) => (
                    <GroupCard
                      key={request.id}
                      onEdit={() => redirectToRequest(request)}
                      group={request}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center">
            <SmallProfilePicture user={user} />
          </div>
        </div>
      </div>

      {children}
    </>
  );
}

export default NavHeadingProvider;
