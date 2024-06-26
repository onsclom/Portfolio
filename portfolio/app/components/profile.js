"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Profile() {
    const [profile, setProfile] = useState(0);

    useEffect(() => {
        const savedValue = localStorage.getItem("profile");
        setProfile(savedValue ? savedValue : 0);
    }, []);

    useEffect(() => {
        localStorage.setItem("profile", profile);
    }, [profile]);

    function handleClick() {
        setProfile(Math.floor(Math.random() * 15));
    }

    return (
        <Image
            src={`/profiles/${profile}.png`}
            width={200}
            height={200}
            alt="Picture of the author"
            className="py-3"
            onClick={handleClick}
        />
    );
}
