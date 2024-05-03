import {badRequest, ok} from "../../helpers/https";
import {UserSignOn} from "@/application/use-cases/user/UserSignOn";
import {HttpRequest} from "../../interfaces/HttpRequest";
import {BaseController} from "../BaseController";
import {HttpResponse} from "@/infrastructure/web/interfaces/HttpResponse";

export class UserSignOnController extends BaseController {
    constructor(private usecase: UserSignOn) {
        super();
    }

    async execute(request: HttpRequest<{email: string, password: string }, undefined, undefined>) : Promise<HttpResponse<{token: string}> | HttpResponse<Error>> {
        try {
            const result = await this.usecase.execute({email: request.body.email, password: request.body.password});
            return ok({token: result})
        } catch (e: any) {
            return badRequest(e);
        }
    }
}
