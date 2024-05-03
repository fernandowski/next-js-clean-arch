import {signOnUserUseCase} from "@/main/factories/compose";
import {UserSignOnController} from "@/infrastructure/web/controllers/user/UserSignOnController";
import {NextRequest, NextResponse} from "next/server";
import {HttpRequest} from "@/infrastructure/web/interfaces/HttpRequest";

export async function POST(req: NextRequest) {
    const userSignOnController = new UserSignOnController(signOnUserUseCase);
    const json = await req.json();
    const httpRequest : HttpRequest<{email: string, password: string }, undefined, undefined> = {
        body: json,
    }
    const data = await userSignOnController.execute(httpRequest);

    if (data.statusCode === 200) {
        const newResponse = NextResponse.json(data)
        newResponse.cookies.set({
            name: 'auth',
            value: (data?.body?.token) as string
        });
        return newResponse
    }
}
