"use client"

import React, {useEffect, useState} from 'react';

function Page() {
    const [mounted, setMounted] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [height, setHeight] = useState(window.innerHeight);

    async function createGroup() {
        try {
            const response = await fetch('/api/groups', {
                method: 'POST',
                body: JSON.stringify({name: groupName}),
            });
            const data = await response.json();
            const id = data?.id
            if (!id) return;
            window.location.replace('/group?id=' + String(id) + '')
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {


        const updateHeight = () => setHeight(window.innerHeight);
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    if (!mounted) return null;

    return (
        <div style={{position: "absolute", top: height / 2, left: "50%", transform: "translate(-50%, -50%)"}}>
            <div
                className="flex flex-col items-center gap-2 dark:bg-gray-700 light:bg-[lightgray] p-4 rounded-2xl dark:border-1 ">
                <input type="text" placeholder="Group name" onChange={(e) => setGroupName(e.target.value)}
                       className="p-2 dark:border rounded"
                       style={{outline: 'none'}}/>
                <button onClick={createGroup}
                        className="cursor-pointer w-full light:text-gray-700 p-2 border-1 dark:text-white  rounded">Create
                </button>
            </div>
        </div>
    );
}

export default Page;