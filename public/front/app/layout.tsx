import "./globals.css";
import { Providers } from "@/app/GlobalRedux/provider";
import type { Metadata } from "next";
import Navbar from "@/app/components/navbar/Index";
import Overlay from "@/app/components/Overlay";
import ButtomNavbar from "./components/navbar/IndexBottom";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    icons: {
        icon: "/app/icon.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" dir="rtl">
            <body>
                <Providers>
                    <Overlay />
                    <Navbar />
                    <ButtomNavbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
