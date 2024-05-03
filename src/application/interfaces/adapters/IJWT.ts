import {AuthenticatedUser} from "@/domain/entities/RegistrationUser";

export interface IJWT {
    generate(payload: Object): string
    verify(token: string): Promise<AuthenticatedUser | null>
}
