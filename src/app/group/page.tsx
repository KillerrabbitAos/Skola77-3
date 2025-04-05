"use client";

import React, { useEffect, useState } from "react";
import { Group } from "@prisma/client";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [group, setGroup] = useState<Group | null>(null);
  const [newMember, setNewMember] = useState<string>("");

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

  async function addMember() {
    if (!newMember.trim()) return;

    const updatedGroup = {
      ...group,
      members: [...(group?.members || []), newMember],
    } as Group;

    setGroup(updatedGroup);
    setNewMember("");

    try {
      await updateGroup(updatedGroup);
    } catch (error) {
      console.error("Failed to add member", error);
    }
  }

  useEffect(() => {
    async function fetchGroup() {
      try {
        const response = await fetch(`/api/groups?id=${id}`);
        if (!response.ok) {
          console.error("Failed to fetch group");
          return;
        }
        const data = await response.json();
        console.log({ data });
        setGroup(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (!id) return;
    fetchGroup().catch(console.error);
  }, [id]);

  if (!id) return null;
  if (!group) return null;

  return (
    <div>
      <input
        type="text"
        placeholder="Group name"
        value={group.name}
        className={
          "m-1 pl-4 py-1 text-3xl light:border-gray-500 light:border-2 light:rounded light:bg-gray-200 dark:bg-[#222222]"
        }
        style={{ outline: "none" }}
        onChange={(e) => {
          const updatedGroup = { ...group, name: e.target.value };
          setGroup(updatedGroup);
          updateGroup(updatedGroup).catch(console.error);
        }}
      />
      <ul className="grid grid-cols-3 gap-4 mt-4">
        {group.members.map((member) => (
          <li
            key={member}
            className="flex items-center justify-center w-24 h-24 bg-gray-200 dark:bg-gray-700 text-center rounded-md shadow-md hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {member}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Add new member"
          value={newMember}
          className="m-1 pl-4 py-1 text-xl light:border-gray-500 light:border-2 light:rounded light:bg-gray-200 dark:bg-[#222222]"
          style={{ outline: "none" }}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <button
          onClick={addMember}
          className="ml-2 px-4 py-1 bg-gray-300 light:text-black dark:text-gray-500 rounded border border-gray-400 hover:bg-gray-400"
        >
          Add Member
        </button>
      </div>
    </div>
  );
}

export default Page;
