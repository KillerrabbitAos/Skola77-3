"use client";
import {useSession} from "next-auth/react";
import {Profile} from "@/app/components/profile";
import {SignInPrompt} from "@/app/components/signInPrompt";
import ThemeSwitcher from "@/app/components/themeSwitcher";

export default function Home() {
    const {data: session} = useSession();
    const user = session?.user;

    const renderContent = () => {
        if (!user) return <SignInPrompt/>;
        return (
            <>
                <div className="grid grid-cols-1">
                    <div className="flex justify-end">
                        <Profile user={user}/>
                    </div>
                </div>
                <ThemeSwitcher/>
            </>
        );
    };

    return <div className="bg-background">{renderContent()}</div>;
}