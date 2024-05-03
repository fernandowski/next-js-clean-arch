export interface ICryptography {
    hash(value: string): Promise<string>
    compareHash(unHashed: string, hashed: string): Promise<Boolean>
}
