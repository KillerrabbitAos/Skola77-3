"use client";

import { useSearchParams } from "next/navigation";
import { useGroupStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Group } from "@prisma/client";
import { useDynamicInterval } from '@/hooks/useDynamicInterval';
import { groupFetchIntervalSteps } from "@/config";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const storedGroup = useGroupStore((state) => state.selectedGroup);
  const clearSelectedGroup = useGroupStore((state) => state.clearSelectedGroup);
  const [group, setGroup] = useState<Group | null>(storedGroup || null);

  async function updateGroup(updatedGroup: Group) {
    try {
      const response = await fetch(`/api/groups`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGroup),
      });
      if (!response.ok) {
        console.error("Failed to update group");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchGroup = async () => {
    try {
      const response = await fetch(`/api/groups?id=${id}`);
      if (!response.ok) {
        console.error("Failed to fetch group");
        return;
      }
      const data = await response.json();
      if (data == group) return;
      setGroup(data);
    } catch (error) {
      console.error(error);
    }
  };

  useDynamicInterval(fetchGroup, groupFetchIntervalSteps);

  useEffect(() => {
    if (storedGroup) clearSelectedGroup();
    if (id) {
      fetchGroup();
    } else {
      setGroup(null);
    }
  }, []);

  if (!id || !group) return null;

  return (
    <div>
      <input
        type="text"
        placeholder="Group name"
        value={group.name}
        className={
          "m-1 pl-4 py-1 text-3xl light:border-gray-500 light:border-2 light:rounded light:bg-gray-200 dark:bg-[#222222] "
        }
        style={{ outline: "none" }}
        onChange={(e) => {
          const updatedGroup = { ...group, name: e.target.value };
          setGroup(updatedGroup);
          updateGroup(updatedGroup).catch(console.error);
        }}
      />
      <ul>
        {group.members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </div>
  );
}
