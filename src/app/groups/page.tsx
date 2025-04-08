"use client";

import React, { useEffect, useState } from "react";
import { Group } from "@prisma/client";
import { useRouter } from "next/navigation";
import GroupCard from "@/components/groupCard";
import { useGroupStore } from "@/lib/store";
import { useGroupsStore } from "@/lib/store";

function Page() {
  const storedGroups = useGroupsStore((state) => state.groups);
  const setGroupsStore = useGroupsStore((state) => state.setGroups);
  const clearSelectedGroups = useGroupsStore((state) => state.clearGroups);

  const [groups, setGroups] = useState<Group[] | []>(storedGroups || null);

  const router = useRouter();

  function redirectToGroupCreator() {
    router.replace("/create-group");
  }

  function changeUrl(group: Group) {
    useGroupStore.getState().setSelectedGroup(group);
    router.replace(`/group?id=${group.id}`);
  }

  async function fetchGroups() {
    const response = await fetch("/api/groups");
    const data = await response.json();
    const groups = data?.groups;
    if (!groups) return;
    setGroupsStore(groups);
    setGroups(groups);
  }

  async function deleteGroup(group: Group) {
    const response = await fetch(`/api/groups?id=${group.id}`, {
      method: "DELETE",
    });
    if (!response.ok) return;

    setGroups((prevGroups) => prevGroups.filter((g) => g.id !== group.id));
  }

  useEffect(() => {
    if (storedGroups) clearSelectedGroups();
    fetchGroups();
  }, []);

  useEffect(() => {
    let fetchCount = 0;
    let intervalDuration = 5000;
    let intervalId: NodeJS.Timeout;

    const dynamicFetchGroups = () => {
      fetchGroups();
      fetchCount++;
      if (fetchCount === 0) {
        intervalDuration = 0;
        clearInterval(intervalId);
        intervalId = setInterval(dynamicFetchGroups, intervalDuration);
      } else if (fetchCount === 2) {
        intervalDuration = 15000;
        clearInterval(intervalId);
        intervalId = setInterval(dynamicFetchGroups, intervalDuration);
      }
      if (fetchCount === 3) {
        intervalDuration = 30000;
        clearInterval(intervalId);
        intervalId = setInterval(dynamicFetchGroups, intervalDuration);
      } else if (fetchCount === 7) {
        intervalDuration = 60000;
        clearInterval(intervalId);
        intervalId = setInterval(dynamicFetchGroups, intervalDuration);
      }
    };

    intervalId = setInterval(dynamicFetchGroups, intervalDuration);
    dynamicFetchGroups();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const groupsInAlphabeticalOrder = groups.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <div className={"ml-2"}>
      <h1 className={"text-3xl mb-3"}>Groups</h1>

      <div className={`flex flex-wrap gap-4`}>
        {groupsInAlphabeticalOrder.length > 0 &&
          groupsInAlphabeticalOrder.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onEdit={() => changeUrl(group)}
              onDelete={() => deleteGroup(group)}
            />
          ))}
      </div>
      <button
        onClick={redirectToGroupCreator}
        className="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-blue-400"
      >
        Create group
      </button>
    </div>
  );
}

export default Page;
