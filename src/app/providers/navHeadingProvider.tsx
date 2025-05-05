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
      <div className="h-20 flex ml-5 items-center">
        <div className="grid grid-cols-10 w-full">
          <div className="flex items-center justify-start">
            {window.location.pathname !== "/" ? (
              <LeftArrowButton onClick={() => router.replace("/")} />
            ) : (
              <div className="flex p-1 px-2 rounded bg-[#121212] items-center justify-center">
                <img
                  className="light:h-[27px] dark:h-[35px]"
                  src="https://swelib.com/logo.png"
                />
              </div>
            )}
          </div>
          <div
            className={`flex col-span-5 items-center justify-center"`}
          >
            <div className="relative w-full">
              <SearchField ref={searchFieldRef} onChange={searchRequests} />
              <div className="absolute top-full light:bg-white left-0 w-full mt-2 ml-2 z-10">
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

          <div className="flex col-span-4 items-center justify-end">
            <div className="flex flex-grow justify-center items-center">
              <div className="grid grid-cols-5">
                <div></div>
                <div>
                  <button
                    onClick={() => {
                      router.replace("/requests");
                      resetSearchField();
                    }}
                    className="h-[35px] w-30 bg-gray-600 text-gray-200 rounded light:hover:bg-gray-700"
                  >
                    Requests
                  </button>
                </div>
                <div></div>
                <div>
                  <button
                    onClick={() => {
                      router.replace("/settings");
                      resetSearchField();
                    }}
                    className="h-[35px] w-30 bg-gray-600 text-gray-200 rounded light:hover:bg-gray-700"
                  >
                    Settings
                  </button>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>

      {children}
    </>
  );
}

export default NavHeadingProvider;
