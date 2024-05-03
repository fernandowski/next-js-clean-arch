import {BaseController} from "@/infrastructure/web/controllers/BaseController";
import {HttpRequest} from "@/infrastructure/web/interfaces/HttpRequest";
import {HttpResponse} from "@/infrastructure/web/interfaces/HttpResponse";
import {NextRequest, NextResponse} from "next/server";
import {UserVerifyJWTController} from "@/infrastructure/web/controllers/user/UserVerifyJWTController";
import {validateUserJWT} from "@/main/factories/compose";

const routeHandler = (controller: BaseController) => async (req: NextRequest, params : any = {}): Promise<NextResponse> => {
    const body = await parseBody(req);

    const validateJWTUseCase = new UserVerifyJWTController(validateUserJWT);
    const validateJWTResponse: HttpResponse = await validateJWTUseCase.execute({
        cookies: req.cookies,
        headers: Object.fromEntries(req.headers.entries())
    });

    if (!(validateJWTResponse.statusCode >= 200 && validateJWTResponse.statusCode <= 299)) {
        return NextResponse.json({error: validateJWTResponse.body?.message}, {status: validateJWTResponse.statusCode});
    }

    const httpRequest: HttpRequest = {
        body: body,
        params: Object.fromEntries(req.nextUrl.searchParams.entries()),
        headers: Object.fromEntries(req.headers.entries()),
        user: (validateJWTResponse.body as any).data || {},
        cookies: req.cookies
    };

    const httpResponse : HttpResponse= await controller.execute(httpRequest, params);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        return NextResponse.json(httpResponse.body,  {status: httpResponse.statusCode});
    } else {
        return NextResponse.json({error: httpResponse.body?.message}, {status: httpResponse.statusCode});
    }
}

async function parseBody(req: NextRequest) {
    try {
        return await req.json();
    } catch (e) {
        return {};
    }
}

function getAuthToken (request: HttpRequest): string {
    const authorizationHeader : string = request.headers?.authorization;
    const authorizationCookie : string = request.cookies.get('auth');

    if(authorizationHeader) {
        const [,jwt]  = authorizationHeader.split(' ');
        return jwt;
    } else if (authorizationCookie) {
        // @ts-ignore
        return authorizationCookie.value;
    } else {
        return '';
    }
}

export default routeHandler;
