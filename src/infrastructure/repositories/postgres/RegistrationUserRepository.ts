import {v4 as uuidV4} from 'uuid';
import {IRegistrationUserRepository} from "@/application/interfaces/repository/IRegistrationUserRepository";
import { User} from "@/domain/entities/RegistrationUser";
import  { PrismaClient } from '@prisma/client';
import prisma from "@/infrastructure/repositories/postgres/Database";

class RegistrationUserRepository implements IRegistrationUserRepository {
    db : PrismaClient;

    constructor() {
        this.db = prisma;
    }
    public async save(user: User): Promise<void> {
        await this.db.user.create({data: {...user, id: uuidV4()}});
    }

    public async findUserOfEmail(email: string): Promise<User | null> {
        const userCollection = await this.db.user.findUnique({
            where: { email: email},
            include: { todos: false }
        });
        return userCollection || null;
    }
}


export const registrationUserRepository = new RegistrationUserRepository();
