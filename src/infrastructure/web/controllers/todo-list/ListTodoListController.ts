import {badRequest, ok} from "../../helpers/https";
import {HttpRequest} from "../../interfaces/HttpRequest";
import {BaseController} from "../BaseController";
import {HttpResponse} from "../../interfaces/HttpResponse";
import {AuthenticatedUser} from "@/domain/entities/RegistrationUser";
import {ListUserTodoLists} from "@/application/use-cases/todo/ListUserTodoLists";

export class ListTodoListController extends BaseController {
    constructor(private useCase: ListUserTodoLists) {
        super()
    }

    async execute(request: HttpRequest<{name: string}, undefined, undefined>): Promise<HttpResponse> {
        try {
            // @ts-ignore
            const authenticatedUser : AuthenticatedUser = {id: request.user.id, email: request.user.email};
            const result = await this.useCase.execute(authenticatedUser);
            return ok({data: result})
        } catch (e: any) {
            return badRequest(e);
        }
    }
}
