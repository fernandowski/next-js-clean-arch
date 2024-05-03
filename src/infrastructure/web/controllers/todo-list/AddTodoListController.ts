import {badRequest, ok} from "../../helpers/https";
import {HttpRequest} from "../../interfaces/HttpRequest";
import {BaseController} from "../BaseController";
import {HttpResponse} from "../../interfaces/HttpResponse";
import {AddTodoList} from "../../../../application/use-cases/todo/AddTodoList";
import {AuthenticatedUser, User} from "../../../../domain/entities/RegistrationUser";
import {TodoList} from "@/domain/entities/TodoList";

export class AddTodoListController extends BaseController {
    constructor(private useCase: AddTodoList) {
        super()
    }

    async execute(request: HttpRequest<{name: string, description: string}, undefined, undefined>): Promise<HttpResponse> {
        try {

            const authenticatedUser : AuthenticatedUser = {id: request.user?.id ?? '', email: request.user?.email ?? ''};
            const todoList : TodoList = {
                userId: '',
                name: request.body?.name ?? '', description: request.body?.description ?? '', id: '', status: ''};
            await this.useCase.execute(authenticatedUser, todoList);
            return ok({status: 'ok'})
        } catch (e: any) {
            return badRequest(e);
        }
    }
}
