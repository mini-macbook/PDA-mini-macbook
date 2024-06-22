import { useEffect, useState } from "react";
import React from 'react'
const GetScrollY = () => {
    const [scrollY, setScrollY] = useState(0);
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setScrollY(scrollPosition);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollY;
};

export default GetScrollY;
