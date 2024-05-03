import {IRegistrationUserRepository} from "@/application/interfaces/repository/IRegistrationUserRepository";
import {IJWT} from "@/application/interfaces/adapters/IJWT";
import {AuthenticatedUser, User} from "@/domain/entities/RegistrationUser";

export class ValidateJWT {
    constructor(
        private userRepository: IRegistrationUserRepository,
        private auth: IJWT
    ) {

    }

    async execute(jwt: string): Promise<AuthenticatedUser | any> {
        if (!jwt) {
            throw new Error('JWT not passed.')
        }

        const decoded = await this.auth.verify(jwt);
        if (decoded === null) {
            throw new Error('Unauthorized')
        }

        const user : User | null = await this.userRepository.findUserOfEmail(decoded.email);

        return { email: user?.email, id: user?.id };
    }
}
