import {badRequest, ok} from "../../helpers/https";
import {HttpRequest} from "../../interfaces/HttpRequest";
import {BaseController} from "../BaseController";
import {HttpResponse} from "../../interfaces/HttpResponse";
import {AuthenticatedUser} from "@/domain/entities/RegistrationUser";
import {MarkTodoAsCompleted} from "@/application/use-cases/todo/MarkTodoAsCompleted";

export class MarkTodoAsCompletedController extends BaseController {
    constructor(private useCase: MarkTodoAsCompleted) {
        super()
    }

    async execute(request: HttpRequest<{name: string}, undefined, undefined, undefined>, params : any): Promise<HttpResponse> {
        try {            // @ts-ignore

            const authenticatedUser : AuthenticatedUser = {id: request.user.id, email: request.user.email};
            const todoId = params.todoId;
            const result = await this.useCase.execute(todoId, authenticatedUser);
            return ok({data: result})
        } catch (e: any) {
            return badRequest(e);
        }
    }
}
