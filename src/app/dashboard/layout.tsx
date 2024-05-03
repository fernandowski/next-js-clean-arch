import SideBar from "@/app/components/Navigation/SideBar";
import {checkAuth} from "@/app/components/AuthCheck";
import {redirect, useRouter} from "next/navigation";

export default async function DashboardLayout({
                                                  children, // will be a page or nested layout
                                              }: {
    children: React.ReactNode
}) {
    const jwt = await checkAuth();

    if (!jwt) {
        redirect('/sign-on');
    }

    return (
        <SideBar children={children}></SideBar>
    )
}

