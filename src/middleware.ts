import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {AuthenticationMiddleware} from "@/infrastructure/web/middleware/AuthenticationMiddleware";
import {Auth} from "@/infrastructure/adapters/Auth";
import {BaseController} from "@/infrastructure/web/controllers/BaseController";
import {HttpRequest} from "@/infrastructure/web/interfaces/HttpRequest";


export async function middleware(request: NextRequest) {
    /*const body = await parseBody(request);
    const httpRequest: HttpRequest = {
        body: body,
        params: Object.fromEntries(request.nextUrl.searchParams.entries()),
        headers: Object.fromEntries(request.headers.entries()),
        cookies: request.cookies
    };

    const protectedRoutesMiddleware : BaseController[] = [
        new AuthenticationMiddleware(new (Auth))
    ];

    for (const middleware  of protectedRoutesMiddleware) {
        const response = await middleware.execute(httpRequest);
        console.log(response)
    }*/


    return NextResponse.next()
}

async function parseBody(req: NextRequest) {
    try {
        return await req.json();
    } catch (e) {
        return {};
    }
}
