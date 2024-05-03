import {HttpRequest} from "../interfaces/HttpRequest";
import {HttpResponse} from "../interfaces/HttpResponse";
import {ok} from "../helpers/https";


// TODO: SHOULD BE AN INTERFACE TO RESPECT THE CONTRACT.
export class BaseController {

    async execute(_httpRequest: HttpRequest, _params: any = {}): Promise<HttpResponse> {
        return ok({});
    }
}
