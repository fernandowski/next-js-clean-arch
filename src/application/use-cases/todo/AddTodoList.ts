import {AuthenticatedUser} from "@/domain/entities/RegistrationUser";
import {TodoList} from "@/domain/entities/TodoList";
import {ITodoListRepository} from "@/application/interfaces/repository/ITodoListRepository";


export class AddTodoList {
    constructor(private todoListRepository: ITodoListRepository) {
    }

    async execute(user: AuthenticatedUser, todoList: TodoList): Promise<void> {
        const {name = ''}: { name: string } = todoList;

        if (name === '') throw new Error('A todo cannot have empty name');

        await this.todoListRepository.save(this.createNewTodo(todoList, user));
    }

    private createNewTodo(todoList: TodoList, user: AuthenticatedUser): TodoList {
        console.log(user)
        return {
            userId: user.id,
            name: todoList.name,
            description: todoList.description || '',
            status: 'pending'
        }
    }
}
