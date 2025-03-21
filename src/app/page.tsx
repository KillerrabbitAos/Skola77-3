"use client";

import {useSession, signIn, signOut} from "next-auth/react";

export default function Dashboard() {
    const {data: session} = useSession();

    if (!session) {
        return (
            <div>
                <p>You are not signed in.</p>
                <button onClick={() => signIn()}>Sign In</button>
            </div>
        );
    }

    return (
        <div className="flex">
            <div>
                <a>Welcome, {session.user?.name}!</a>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
            <div>
                <img src={session.user?.image as string} alt={session.user?.name as string}/>
            </div>
        </div>
    );
}
