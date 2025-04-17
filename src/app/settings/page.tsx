"use client"

import React, {useEffect, useState} from 'react';
import ThemeSwitcher from "@/components/themeSwitcher";
import {useSession} from "next-auth/react";
import {SignInPrompt} from "@/components/signInPrompt";
import { useTheme } from 'next-themes';

const Settings: React.FC = () => {
    const {data: session, status} = useSession();
    const [loading, setLoading] = useState(true);
    const { theme, setTheme } = useTheme();
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
            {theme === "unicorn" && <img
            className='mx-auto'
                src="/astral-unicorn.jpg"
                alt="/--/o-"
                width={500}
                height={500}
            />}
        </div>
    );
};

export default Settings;