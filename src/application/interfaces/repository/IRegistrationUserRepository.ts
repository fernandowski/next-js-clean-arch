import {RegistrationUser, User} from "@/domain/entities/RegistrationUser";

export interface IRegistrationUserRepository {
    save(registrationUser: RegistrationUser): Promise<void>,
    findUserOfEmail(email: string): Promise<User | null>
}
