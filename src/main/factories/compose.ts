import {registrationUserRepository} from "@/infrastructure/repositories/postgres/RegistrationUserRepository";
import {PasswordHasher} from "@/infrastructure/adapters/PasswordHasher";
import {UserFactory} from "./usecase/UserFactory";
import {Auth} from "@/infrastructure/adapters/Auth";
import {AddTodoListFactory} from "./usecase/AddTodoListFactory";
import {todoListRepository} from "@/infrastructure/repositories/postgres/TodoListRepository";
import {ListTodoListFactory} from "./usecase/ListTodoListFactory";
import {MarkTodoAsCompletedFactory} from "@/main/factories/usecase/MarkTodoAsCompletedFactory";

const passwordHasher = new PasswordHasher();
const auth = new Auth();

export const registerUserUseCase = UserFactory.composeRegisterUserUseCase(registrationUserRepository, passwordHasher);
export const signOnUserUseCase = UserFactory.composeSignOnUserUseCase(registrationUserRepository, passwordHasher, auth);
export const addTodoListUseCase = AddTodoListFactory.compose(todoListRepository);
export const listUserTodoList = ListTodoListFactory.compose(todoListRepository);
export const validateUserJWT = UserFactory.composeValidateUserJWT(registrationUserRepository, auth);
export const markTodoAsCompletedUseCase = MarkTodoAsCompletedFactory.compose(todoListRepository);


