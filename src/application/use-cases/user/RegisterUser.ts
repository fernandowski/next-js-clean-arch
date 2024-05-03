import {IRegistrationUserRepository} from "@/application/interfaces/repository/IRegistrationUserRepository";
import {ICryptography} from "@/application/interfaces/adapters/ICryptography";
import {RegistrationUser} from "@/domain/entities/RegistrationUser";

export class RegisterUser {
    constructor(private registrationUserRepository: IRegistrationUserRepository, private passwordHasher: ICryptography) {
    }

    async execute({ email, password }: RegistrationUser): Promise<void> {
        const existingUser = await this.registrationUserRepository.findUserOfEmail(email);
        console.log('???');

        if(existingUser) {
            throw new Error('Email Already Taken');
        }

        console.log('before')
        const hashedPassword = await this.passwordHasher.hash(password);
        console.log('never get here.')
        try {
            await this.registrationUserRepository.save({email, password: hashedPassword});
        } catch (e) {
            console.log(e)
        }

    }
}
