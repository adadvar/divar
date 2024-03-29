import "./globals.css";

import type { Metadata } from "next";
import Hydrations from "../ui/Hydration";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "داشبورد",
    description: "Generated by create next app",
};

// const vazirFont = localFont({ src: "../public/fonts/Vazirmatn-Regular.woff2" });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Hydrations />
                {children}
                <Toaster position="top-right" />
            </body>
        </html>
    );
}
