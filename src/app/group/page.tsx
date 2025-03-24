"use client";

import React, {useEffect, useState} from 'react';
import {Group} from "@prisma/client";
import {useSearchParams} from 'next/navigation';

function Page() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [group, setGroup] = useState<Group | null>(null);


    async function updateGroup(updatedGroup: Group) {
        try {
            const response = await fetch(`/api/groups`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedGroup),
            });
            if (!response.ok) {
                console.error('Failed to update group');
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchGroup() {
            try {
                const response = await fetch(`/api/groups?id=${id}`);
                if (!response.ok) {
                    console.error('Failed to fetch group');
                    return;
                }
                const data = await response.json();
                console.log({data});
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
                className={"m-1 pl-4 py-1 text-3xl light:border-gray-500 light:border-2 light:rounded light:bg-gray-200 dark:bg-[#222222] "}
                style={{outline: 'none'}}
                onChange={(e) => {
                    const updatedGroup = {...group, name: e.target.value};
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

export default Page;