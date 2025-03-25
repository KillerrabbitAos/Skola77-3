"use client";

import React, { useEffect, useState } from 'react';
import { LargeProfilePicture } from "@/components/largeProfilePicture";
import { useSession } from "next-auth/react";

function Page() {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const user = session?.user;

    useEffect(() => {
        if (user) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    fetch('/api/location', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ latitude, longitude }),
                    }).catch((err) => console.error('', err));
                },
                (error) => {
                    console.error('', error);
                }
            );
        }
    }, [user]);

    useEffect(() => {
        setLoading(false);
    }, []);


    if (loading || !user) return null;

    return (
        <div>
            <LargeProfilePicture user={user} />

        </div>
    );
}

export default Page;