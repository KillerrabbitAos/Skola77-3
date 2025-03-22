"use client"

import React, {useEffect, useState} from 'react';
import {LargeProfilePicture} from "@/app/components/largeProfilePicture";
import {useSession} from "next-auth/react";

function Page() {
    const {data: session} = useSession();
    const [loading, setLoading] = useState(true);

    const user = session?.user;

    useEffect(() => {
        setLoading(false);
    }, []);

    if (!loading) return null;
    if (!user) return null;
    return (
        <div>
            <LargeProfilePicture user={user}/>
        </div>
    );
}

export default Page;