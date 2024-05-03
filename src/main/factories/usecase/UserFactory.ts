import {RegisterUser} from "@/application/use-cases/user/RegisterUser";
import {PasswordHasher} from "@/infrastructure/adapters/PasswordHasher";
import {IRegistrationUserRepository} from "@/application/interfaces/repository/IRegistrationUserRepository";
import {UserSignOn} from "@/application/use-cases/user/UserSignOn";
import {IJWT} from "@/application/interfaces/adapters/IJWT";
import {ValidateJWT} from "@/application/use-cases/user/ValidateJWT";

export class UserFactory {
    public static composeRegisterUserUseCase(userRepository: IRegistrationUserRepository , passwordHasher: PasswordHasher) : RegisterUser {
        return new RegisterUser(userRepository, passwordHasher);
    }

    public static composeSignOnUserUseCase(
        userRepository: IRegistrationUserRepository,
        passwordHasher: PasswordHasher,
        jwt: IJWT
    ) : UserSignOn {
        return new UserSignOn(userRepository, passwordHasher, jwt);
    }

    public static composeValidateUserJWT(
        userRepository: IRegistrationUserRepository,
        jwt: IJWT
    ) : ValidateJWT {
        return new ValidateJWT(userRepository, jwt);
    }
}
