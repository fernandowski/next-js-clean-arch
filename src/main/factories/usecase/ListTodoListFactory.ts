import {ITodoListRepository} from "@/application/interfaces/repository/ITodoListRepository";
import {ListUserTodoLists} from "@/application/use-cases/todo/ListUserTodoLists";

export class ListTodoListFactory {

    public static compose(todoListRepository: ITodoListRepository) : ListUserTodoLists {
        return new ListUserTodoLists(todoListRepository)
    }
}
