import Sidebar from "@/app/ui/admin/dashboard/sidebar";
import Navbar from "@/app/ui/admin/dashboard/navbar";
import Footer from "@/app/ui/admin/dashboard/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <div className="md:block hidden w-1/4 h-full bg-bgSoft p-5">
                <Sidebar />
            </div>
            <div className="md:w-3/4 w-full h-full p-5">
                <Navbar />
                {children}
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
