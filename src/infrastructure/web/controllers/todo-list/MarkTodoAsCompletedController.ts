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

    async execute(_httpRequest: HttpRequest, _params: any = {}): Promise<HttpResponse> {
        try {

            const authenticatedUser : AuthenticatedUser = {id: _httpRequest.user?.id ?? '', email: _httpRequest.user?.email ?? ''};
            const todoId = _params.todoId;
            const result = await this.useCase.execute(todoId, authenticatedUser);
            return ok({data: result})
        } catch (e: any) {
            return badRequest(e);
        }
    }
}
