import {badRequest, ok} from "../../helpers/https";
import {ValidateJWT} from "@/application/use-cases/user/ValidateJWT";
import {HttpRequest} from "../../interfaces/HttpRequest";
import {BaseController} from "../BaseController";
import {HttpResponse} from "@/infrastructure/web/interfaces/HttpResponse";

export class UserVerifyJWTController extends BaseController {
    constructor(private usecase: ValidateJWT) {
        super();
    }

    async execute(_httpRequest: HttpRequest, _params: any = {}) : Promise<HttpResponse> {
        try {
            const jwt = this.getAuthToken(_httpRequest)
            const result = await this.usecase.execute(jwt);
            return ok({data: result})
        } catch (e: any) {
            return badRequest(e);
        }
    }

    private getAuthToken (request: HttpRequest): string {
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
}
