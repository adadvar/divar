import "./globals.css";
import type { Metadata } from "next";
import Overlay from "./ui/Overlay";
import Navbar from "@/app/ui/navbar/Index";
import ButtomNavbar from "@/app/ui/navbar/IndexBottom";
import StoreInitializer from "./ui/StoreInitializer";
import Hydrations from "./ui/Hydration";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    icons: {
        icon: "/app/icon.png",
    },
};

// const vazirFont = localFont({ src: "../public/fonts/Vazirmatn-Regular.woff2" });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" dir="rtl">
            <body>
                <Hydrations />
                <main className="max-w-screen-xl mx-auto py-20 px-2">
                    <Overlay />
                    {children}
                    <ButtomNavbar />
                    <Navbar />
                </main>
            </body>
        </html>
    );
}
