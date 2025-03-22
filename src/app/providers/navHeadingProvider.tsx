import React, {useEffect, useState} from 'react';
import {Profile} from "@/app/components/profile";
import {useSession} from "next-auth/react";
import {SignInPrompt} from "@/app/components/signInPrompt";
import {LeftArrowButton} from "@/app/components/leftArrowButton";

function NavHeadingProvider({children}: { children: React.ReactNode }) {
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

    return (<>
            <div className="grid grid-cols-2 h-20">
                <div className="flex items-center justify-start">
                    <LeftArrowButton onClick={() => {
                        window.location.replace("/")
                    }}/>
                </div>
                <div className="flex justify-end">
                    <Profile user={user}/>
                </div>
            </div>
            {children}
        </>
    );
}

export default NavHeadingProvider;