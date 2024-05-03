import {AddTodoList} from "@/application/use-cases/todo/AddTodoList";
import {ITodoListRepository} from "@/application/interfaces/repository/ITodoListRepository";

export class AddTodoListFactory {

    public static compose(todoListRepository: ITodoListRepository) : AddTodoList {
        return new AddTodoList(todoListRepository)
    }
}
