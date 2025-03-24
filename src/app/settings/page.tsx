"use client"

import React, {useEffect, useState} from 'react';
import ThemeSwitcher from "@/components/themeSwitcher";
import {useSession} from "next-auth/react";
import {SignInPrompt} from "@/components/signInPrompt";

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
        <div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Preferences</h2>
                <ThemeSwitcher/>
            </div>
        </div>
    );
};

export default Settings;