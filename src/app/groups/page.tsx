"use client"

import React, {useEffect, useState} from 'react';
import {Group} from "@prisma/client";

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
    return (
        <div>
            <h1>Groups</h1>

            <button onClick={redirectToGroupCreator} className={"cursor-pointer"}>Create new Group</button>
            {groups.length > 0 && groups.map((group) => (
                <div key={group.id}>
                    <h2>{group.name}</h2>
                    <button
                        onClick={() => window.location.replace(`/group?id=${group.id}`)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => deleteGroup(group)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                    >
                        Delete
                    </button>
                    <p>Members: {group.members.length}</p>
                </div>
            ))}
        </div>
    );
}

export default Page;