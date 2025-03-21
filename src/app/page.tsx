"use client";

import {useSession} from "next-auth/react";
import {Profile} from "@/app/components/profile";
import {SignInPrompt} from "@/app/components/signInPrompt";
import ThemeSwitcher from "@/app/components/themeSwitcher";

export default function Home() {
    const {data: session} = useSession();
    const currentUser = session?.user;

    if (!currentUser) {
        return SignInPrompt();
    }

    return (<div className={"bg-background"}>
            <div className="grid grid-cols-1">
                <div className="flex justify-end">
                    <Profile user={currentUser}/>
                </div>
            </div>
            <ThemeSwitcher/>
        </div>
    );
}