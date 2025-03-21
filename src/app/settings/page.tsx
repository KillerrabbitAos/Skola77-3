"use client"

import React, {useEffect, useState} from 'react';
import ThemeSwitcher from "@/app/components/themeSwitcher";
import {useSession} from "next-auth/react";
import {SignInPrompt} from "@/app/components/signInPrompt";
import {Profile} from "@/app/components/profile";

const Settings: React.FC = () => {
    const {data: session, status} = useSession();
    const [loading, setLoading] = useState(true);
    const user = session?.user;

    useEffect(() => {
        if (status !== "loading") {
            setLoading(false);
        }
    }, [status]);

    if (loading) return null;
    if (!user) return <SignInPrompt/>;

    return (
        <div className="grid grid-cols-2">
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">Preferences</h2>
                <ThemeSwitcher/>
            </div>
            <div className="justify-items-end">
                <Profile user={user}/>
            </div>
        </div>
    );
};

export default Settings;