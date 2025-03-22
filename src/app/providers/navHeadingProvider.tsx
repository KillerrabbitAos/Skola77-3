import React, {useEffect, useState} from 'react';
import {SmallProfilePicture} from "@/app/components/smallProfilePicture";
import {useSession} from "next-auth/react";
import {SignInPrompt} from "@/app/components/signInPrompt";
import {LeftArrowButton} from "@/app/components/leftArrowButton";
import {SearchField} from "@/app/components/searchField";

function NavHeadingProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const user = session?.user;

    useEffect(() => {
        if (status !== "loading") {
            setLoading(false);
        }
    }, [status]);

    if (loading) return null;
    if (!user) return <SignInPrompt />;

    return (
        <>
            <div className="grid grid-cols-5 h-20">
                <div className="flex items-center justify-start">
                    <LeftArrowButton onClick={() => {
                        window.location.replace("/")
                    }}/>
                </div>
                <div className="flex col-span-3 items-center justify-center">
                    <SearchField/>
                </div>
                <div className="flex justify-end items-center">
                    <SmallProfilePicture user={user}/>
                </div>
            </div>
            {children}
        </>
    );
}

export default NavHeadingProvider;
