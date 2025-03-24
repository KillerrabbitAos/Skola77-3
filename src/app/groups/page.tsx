"use client"

import React, {useEffect, useState} from 'react';
import {Group} from "@prisma/client";
import GroupCard from "@/components/groupCard";

function Page() {
    const [mounted, setMounted] = useState(false);
    const [groups, setGroups] = useState([] as Array<Group>);

    function redirectToGroupCreator() {
        window.location.replace('/create-group')
    }

    async function fetchGroups() {
        const response = await fetch('/api/groups');
        const data = await response.json();
        const groups = data?.groups;
        if (!groups) return;
        setGroups(groups);

    }

    async function deleteGroup(group: Group) {
        const response = await fetch(`/api/groups?id=${group.id}`, {
            method: 'DELETE',
        });
        if (!response.ok) return;
        setGroups((prevGroups) => prevGroups.filter((g) => g.id !== group.id));
    }

    useEffect(() => {
        setMounted(true);

        fetchGroups();
    }, []);

    if (!mounted) return null;

    const groupsInAlphabeticalOrder = groups.sort((a, b) => a.name.localeCompare(b.name));
    return (
        <div className={"ml-2"}>
            <h1 className={"text-3xl mb-3"}>Groups</h1>

            <div
                className={`flex flex-wrap gap-4`}
            >
                {groupsInAlphabeticalOrder.length > 0 &&
                    groupsInAlphabeticalOrder.map((group) => (
                        <GroupCard
                            key={group.id}
                            group={group}
                            onEdit={() => window.location.replace(`/group?id=${group.id}`)}
                            onDelete={() => deleteGroup(group)}
                        />
                    ))}
            </div>
            <button onClick={redirectToGroupCreator}
                    className="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-blue-400">
                Create group
            </button>
        </div>
    );
}

export default Page;