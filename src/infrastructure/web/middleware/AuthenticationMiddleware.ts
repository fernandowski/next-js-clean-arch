import {HttpRequest} from "../interfaces/HttpRequest";
import {HttpResponse} from "../interfaces/HttpResponse";
import {badRequest, ok} from "../helpers/https";
import {IJWT} from "@/application/interfaces/adapters/IJWT";
import {BaseController} from "../controllers/BaseController";

export class AuthenticationMiddleware extends BaseController {
     constructor( private crypto: IJWT) {
         super()
     }

     async execute(httpRequest : HttpRequest) : Promise<HttpResponse> {
         const jwt = getAuthToken(httpRequest);

         const decoded = await this.crypto.verify(jwt);
         if (decoded === null) {
             return badRequest(new Error('Unauthorized'));
         }
         return ok({user: decoded});
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
