import {v4 as uuidV4} from 'uuid';
import {AuthenticatedUser} from "@/domain/entities/RegistrationUser";
import {ITodoListRepository} from "@/application/interfaces/repository/ITodoListRepository";
import {TodoList} from "@/domain/entities/TodoList";
import {PrismaClient} from "@prisma/client";
import prisma from "@/infrastructure/repositories/postgres/Database";
import { todo } from '@prisma/client'

class TodoListRepository implements ITodoListRepository {

    db : PrismaClient;

    constructor() {
        this.db = prisma;
    }

    public async save(todoList: TodoList): Promise<void> {
        await this.db.todo.create({
            data: {
                id: uuidV4(),
                user_id: todoList.userId,
                name: todoList.name,
                description: todoList.description,
                status: todoList.status
            }
        });
    }

    public async listUserTodosList(user: AuthenticatedUser) : Promise<any[]> {
        return this.db.todo.findMany( {where: {user_id: user.id}});
    }

    public async find(todoId : string): Promise<TodoList | null> {
        const todo : todo | null = await this.db.todo.findUnique({
            where: { id: todoId},
            include: { user: false }
        });

        if (!todo) {
            return  null;
        }

        return {
            id: todo.id,
            userId: todo.user_id,
            name: todo.name,
            status: todo.status,
            description: todo.description
        };
    }

    public async update(id: string, todo: TodoList): Promise<void> {
        await this.db.todo.update({
            where: { id: id},
            data: {
                name: todo.name,
                status: todo.status,
                description: todo.description
            }
        });
    }
}

export const todoListRepository = new TodoListRepository();
