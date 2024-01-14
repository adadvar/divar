import Sidebar from "@/app/ui/admin/dashboard/sidebar";
import Navbar from "@/app/ui/admin/dashboard/navbar";
import Footer from "@/app/ui/admin/dashboard/footer";
import ToastContainerWrapper from "@/app/ui/ToastContainerWrapper";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <div className="w-1/4 h-full bg-bgSoft p-5">
                <Sidebar />
            </div>
            <div className="w-3/4 p-5">
                <Navbar />
                {children}
                <Footer />
            </div>
            <ToastContainerWrapper />
        </div>
    );
};

export default Layout;
