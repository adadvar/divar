import Sidebar from "@/app/ui/admin/dashboard/sidebar";
import Navbar from "@/app/ui/admin/dashboard/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <div className="">
                <Sidebar />
            </div>
            <div className="">
                <Navbar />
                {children}
            </div>
        </div>
    );
};

export default Layout;
