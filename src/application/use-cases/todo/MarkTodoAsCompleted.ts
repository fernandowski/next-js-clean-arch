import {AuthenticatedUser} from "@/domain/entities/RegistrationUser";
import {TodoList} from "@/domain/entities/TodoList";
import {ITodoListRepository} from "@/application/interfaces/repository/ITodoListRepository";


export class MarkTodoAsCompleted {
    constructor(private todoListRepository: ITodoListRepository) {
    }

    async execute(id: string, user: AuthenticatedUser): Promise<void> {
        const todo : TodoList | null = await this.todoListRepository.find(id);

        if (!todo) {
            throw new Error('Object Does not exist.');
        }

        if (todo?.userId != user.id) {
            throw new Error('Does not belong to you.');
        }

        todo.status = 'completed';
        await this.todoListRepository.update(id, todo);
    }
}
