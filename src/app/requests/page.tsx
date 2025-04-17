"use client";

import React, { useEffect, useState } from "react";
import { Request } from "@prisma/client";
import { useRouter } from "next/navigation";
import GroupCard from "@/components/requestCard";
import { useGroupStore } from "@/lib/store";
import { useGroupsStore } from "@/lib/store";
import { useDynamicInterval } from "@/hooks/useDynamicInterval";
import { groupsFetchIntervalSteps } from "@/config";

function Page() {
  const storedGroups = useGroupsStore((state) => state.groups);
  const setGroupsStore = useGroupsStore((state) => state.setGroups);
  const clearSelectedGroups = useGroupsStore((state) => state.clearGroups);

  const [groups, setGroups] = useState<Request[] | []>(storedGroups || null);

  const router = useRouter();

  router.prefetch("/create-request");

  function redirectToGroupCreator() {
    router.replace("/create-request");
  }

  function changeUrl(group: Request) {
    useGroupStore.getState().setSelectedGroup(group);
    router.replace(`/request?id=${group.id}`);
  }

  async function fetchGroups() {
    const response = await fetch("/api/groups");
    const data = await response.json();
    const groups = data?.groups;
    if (!groups) return;
    setGroupsStore(groups);
    setGroups(groups);
  }

  async function deleteGroup(group: Request) {
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

  useDynamicInterval(fetchGroups, groupsFetchIntervalSteps);

  const groupsInAlphabeticalOrder = groups.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <div className={"ml-2"}>
      <div className="flex items-center mb-3">
        <h1 className={"text-3xl mr-4"}>Requests</h1>{" "}
        <button
          onClick={redirectToGroupCreator}
          className="px-4 py-2 bg-gray-600 text-gray-200 rounded light:hover:bg-gray-700"
        >
          Create new
        </button>
      </div>

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
    </div>
  );
}

export default Page;
