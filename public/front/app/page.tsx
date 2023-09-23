"use client";

import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { RootState } from "./GlobalRedux/store";
import Overlay from "./components/Overlay";

export default function Home() {
    const isSearchOpen = useSelector(
        (state: RootState) => state.global.isSearchOpen
    );

    return (
        <main>
            {isSearchOpen && <Overlay top={66} left={0} isSearchOpen/>}
            <Navbar />
        </main>
    );
}
