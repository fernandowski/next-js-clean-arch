import {ITodoListRepository} from "@/application/interfaces/repository/ITodoListRepository";
import {MarkTodoAsCompleted} from "@/application/use-cases/todo/MarkTodoAsCompleted";

export class MarkTodoAsCompletedFactory {

    public static compose(todoListRepository: ITodoListRepository) : MarkTodoAsCompleted {
        return new MarkTodoAsCompleted(todoListRepository)
    }
}
