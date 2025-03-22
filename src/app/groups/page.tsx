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
        setGroups(data);
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
                <div key={group.name}>
                    <h2>{group.name}</h2>
                    <p>Members: {group.members.length}</p>
                </div>
            ))}
        </div>
    );
}

export default Page;