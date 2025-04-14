"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGroupsStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const setGroups = useGroupsStore((state) => state.setGroups);

  const fetchGroups = async () => {
    const response = await fetch("/api/groups");
    const data = await response.json();
    setGroups(data?.groups || []);
  };

  useEffect(() => {
    fetchGroups();
  }, [setGroups]);

  function redirectToGroupsPage() {
    router.replace("/requests");
  }

  function redirectToSettingsPage() {
    router.replace("/settings");
  }

  function redirectToAccountCreator() {
    router.replace("/create-account");
  }

  const renderContent = () => {
    return (
      <>
        <div className={"mx-1"}>Dev</div>
        <button
          onClick={redirectToGroupsPage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition mx-1"
        >
          Go to Requests
        </button>
        <button
          onClick={redirectToSettingsPage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition"
        >
          Go to Settings
        </button>
        <button
          onClick={redirectToAccountCreator}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 mx-1 transition"
        >
          Go to Account Creator
        </button>
      </>
    );
  };

  return <div className="bg-background">{renderContent()}</div>;
}
