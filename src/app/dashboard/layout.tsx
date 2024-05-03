import SideBar from "@/app/components/Navigation/SideBar";
import {checkAuth} from "@/app/components/AuthCheck";
import {redirect, useRouter} from "next/navigation";
import {cookies, headers} from "next/headers";
import {HttpRequest} from "@/infrastructure/web/interfaces/HttpRequest";
import {UserVerifyJWTController} from "@/infrastructure/web/controllers/user/UserVerifyJWTController";
import {validateUserJWT} from "@/main/factories/compose";

export default async function DashboardLayout({
                                                  children, // will be a page or nested layout
                                              }: {
    children: React.ReactNode
}) {

    const httpRequest: HttpRequest = {
        headers: Object.fromEntries(headers().entries()),
        cookies: cookies()
    };
    const controller = new UserVerifyJWTController(validateUserJWT);
    const result = await controller.execute(httpRequest);

    if(result.statusCode !== 200) {
        redirect('/sign-on');
    }

    return (
        <SideBar>{children}</SideBar>
    )
}

