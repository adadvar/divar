import Card from "@/app/ui/admin/dashboard/card";
import Transactions from "@/app/ui/admin/dashboard/transactions";
import Rightbar from "@/app/ui/admin/dashboard/rightbar";
import Chart from "@/app/ui/admin/dashboard/chart";
import { useAuth } from "@/app/store/global-store";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    // const { push } = useRouter();

    // const { auth } = useAuth();
    // const isLogged = auth.access_token ? true : false;
    // if (!isLogged) push("/admin/login");
    return (
        <div className="flex gap-5 mt-5">
            <div className="flex flex-col gap-5 w-2/3">
                <div className="flex gap-5 justify-between">
                    <Card />
                    <Card />
                    <Card />
                </div>
                <Transactions />
                <Chart />
            </div>
            <div className="w-1/3">
                <Rightbar />
            </div>
        </div>
    );
};

export default Dashboard;
