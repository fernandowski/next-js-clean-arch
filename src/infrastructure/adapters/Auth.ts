import jwt from 'jsonwebtoken';
import {IJWT} from "@/application/interfaces/adapters/IJWT";
import {AuthenticatedUser} from "@/domain/entities/RegistrationUser";

export class Auth implements IJWT{
    constructor(private readonly secret: string = 'secret') {}
    generate(payload: string): string {
        return jwt.sign(payload, this.secret, {expiresIn: 60 * 5});
    }

    async verify(token: string): Promise<AuthenticatedUser | null> {
        try {
            return jwt.verify(token, this.secret) as AuthenticatedUser;
        } catch (error) {
            return null;
        }
    }
}
