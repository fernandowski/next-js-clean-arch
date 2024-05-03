import {v4 as uuidV4} from 'uuid';
import {IRegistrationUserRepository} from "@/application/interfaces/repository/IRegistrationUserRepository";
import {RegistrationUser, User} from "@/domain/entities/RegistrationUser";
import Database from "@/infrastructure/repositories/in-memory/Database";

class RegistrationUserRepository implements IRegistrationUserRepository {
    public async save(user: User): Promise<void> {
        const db = Database.getInstance();
        db.registeredUsers.push({...user, id: uuidV4()});
    }

    public async findUserOfEmail(email: string): Promise<User | null> {
        const db = Database.getInstance();
        const userCollection: User | undefined = db.registeredUsers.find((registeredUser: RegistrationUser) => registeredUser.email === email);
        return userCollection || null;
    }
}


export const registrationUserRepository = new RegistrationUserRepository();
