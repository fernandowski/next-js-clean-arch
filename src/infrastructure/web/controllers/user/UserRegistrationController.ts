import {badRequest, ok} from "../../helpers/https";
import {RegisterUser} from "@/application/use-cases/user/RegisterUser";
import {RegistrationUser} from "@/domain/entities/RegistrationUser";
import {HttpRequest} from "../../interfaces/HttpRequest";
import {BaseController} from "../BaseController";
import {HttpResponse} from "../../interfaces/HttpResponse";

export class UserRegistrationController extends BaseController{
    constructor(private usecase: RegisterUser) {
        super()
    }

    async execute(request: HttpRequest<{email: string, password: string}, undefined, undefined>): Promise<HttpResponse> {
        try {
            // @ts-ignore
            const user : RegistrationUser = {email: request.body.email, password: request.body.password}
            console.log('start')
            console.log(user)
            await this.usecase.execute(user);
            console.log('kkkk')
            return ok({status: 'ok'})
        } catch (e: any) {
            console.log(e)
            return badRequest(e);
        }
    }
}
