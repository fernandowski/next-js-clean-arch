import {AuthenticatedUser} from "@/domain/entities/RegistrationUser";
import {TodoList} from "@/domain/entities/TodoList";
import {ITodoListRepository} from "@/application/interfaces/repository/ITodoListRepository";


export class ListUserTodoLists {
    constructor(private todoListRepository: ITodoListRepository) {
    }

    async execute(user: AuthenticatedUser): Promise<TodoList[]> {
        return this.todoListRepository.listUserTodosList(user)
    }
}
