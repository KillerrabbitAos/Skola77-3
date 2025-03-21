"use client"

import React from 'react';
import ThemeSwitcher from "@/app/components/themeSwitcher";
import {useSession} from "next-auth/react";
import {SignInPrompt} from "@/app/components/signInPrompt";

const Settings: React.FC = () => {
    const {data: session} = useSession();
    const user = session?.user;

    if (!user) return <SignInPrompt/>;
    return (
        <div className="grid grid-cols-2">
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">Preferences</h2>
                <ThemeSwitcher/>
            </div>

        </div>
    );
};

export default Settings;