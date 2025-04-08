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
    router.replace("/groups");
  }

  function redirectToSettingsPage() {
    router.replace("/settings");
  }

  const renderContent = () => {
    return (
      <>
        <div className={"mx-1"}>Dev</div>
        <button
          onClick={redirectToGroupsPage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition mx-1"
        >
          Go to Groups
        </button>
        <button
          onClick={redirectToSettingsPage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 transition"
        >
          Go to Settings
        </button>
      </>
    );
  };

  return <div className="bg-background">{renderContent()}</div>;
}
