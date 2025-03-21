"use client";

import {useSession} from "next-auth/react";
import {Profile} from "@/app/components/profile";
import {SignInPrompt} from "@/app/components/signInPrompt";
import {useState, useEffect} from "react";

export default function Home() {
    const {data: session, status} = useSession();
    const [loading, setLoading] = useState(true);
    const user = session?.user;

    useEffect(() => {
        if (status !== "loading") {
            setLoading(false);
        }
    }, [status]);

    const renderContent = () => {
        if (loading) return null;
        if (!user) return <SignInPrompt/>;
        return (
            <>
                <div className="grid grid-cols-1">
                    <div className="flex justify-end">
                        <Profile user={user}/>
                    </div>
                </div>
            </>
        );
    };

    return <div className="bg-background">{renderContent()}</div>;
}