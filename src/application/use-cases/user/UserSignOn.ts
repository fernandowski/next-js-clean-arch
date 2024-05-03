import {IRegistrationUserRepository} from "../../interfaces/repository/IRegistrationUserRepository";
import {ICryptography} from "../../interfaces/adapters/ICryptography";
import {IJWT} from "../../interfaces/adapters/IJWT";
import {UserCredentials} from "@/domain/entities/RegistrationUser";

export class UserSignOn {
    constructor(
        private registrationUserRepository: IRegistrationUserRepository,
        private crypto: ICryptography,
        private auth: IJWT,
    ) {
    }

    async execute({ email, password }: UserCredentials): Promise<string> {
        const user = await this.registrationUserRepository.findUserOfEmail(email);

        if (!user) {
            throw new Error('Invalid Credentials');
        }

        const correctPassword = await this.crypto.compareHash(password, user.password)
        if (!correctPassword) {
            throw new Error('Invalid Credentials')
        }

        return this.auth.generate({email: user.email, id: user.id});
    }
}
