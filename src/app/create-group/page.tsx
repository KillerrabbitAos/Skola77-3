"use client"

import React, {useEffect, useState} from 'react';

function Page() {
    const [mounted, setMounted] = useState(false);
    const [groupName, setGroupName] = useState('');

    async function createGroup() {
        try {
            const response = await fetch('/api/group', {
                method: 'POST',
                body: groupName as string,
            });
            const data = await response.json();
            window.location.replace('/group?id=' + data + '')
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) return null;
    return (
        <div>
            <input type="text" placeholder="Group name" onChange={(e) => setGroupName(e.target.value)}/>

            <button onClick={createGroup} className={"cursor-pointer"}>Create</button>

        </div>
    );
}

export default Page;