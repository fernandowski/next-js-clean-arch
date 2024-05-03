import {AuthenticatedUser} from "@/domain/entities/RegistrationUser";
import {TodoList} from "@/domain/entities/TodoList";

export interface ITodoListRepository {
    save(todoList: TodoList) : Promise<void>
    listUserTodosList(user: AuthenticatedUser) : Promise<TodoList[]>
    find(id: string) : Promise<TodoList | null>
    update(id: string, todo: TodoList) : Promise<void>
}
