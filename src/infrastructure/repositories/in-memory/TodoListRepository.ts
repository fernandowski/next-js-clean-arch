import {v4 as uuidV4} from 'uuid';
import {AuthenticatedUser} from "@/domain/entities/RegistrationUser";
import {ITodoListRepository} from "@/application/interfaces/repository/ITodoListRepository";
import {TodoList} from "@/domain/entities/TodoList";
import Database from "@/infrastructure/repositories/in-memory/Database";

class TodoListRepository implements ITodoListRepository {
    public async save(todoList: TodoList): Promise<void> {
        const db = Database.getInstance();
        db.todoList.push({...todoList, id: uuidV4()} );
    }

    public async listUserTodosList(user: AuthenticatedUser) : Promise<TodoList[]> {
        const db = Database.getInstance();
        return db.todoList.filter((todoList: TodoList) => todoList.userId === user.id);
    }
}

export const todoListRepository = new TodoListRepository();
