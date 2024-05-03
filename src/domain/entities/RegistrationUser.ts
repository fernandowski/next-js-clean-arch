export type User = {
    id: string,
    email: string,
    password: string
}

export type UserCredentials = Omit<User, 'id'>;
export type RegistrationUser = Omit<User, 'id'>;
export type AuthenticatedUser = Omit<User, 'password'>;
