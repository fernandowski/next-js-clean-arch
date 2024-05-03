import {ICryptography} from "@/application/interfaces/adapters/ICryptography";
import * as bcrypt from 'bcrypt';

export class PasswordHasher implements ICryptography {
    async hash(value: string) : Promise<string> {
        const salt = await bcrypt.genSalt(2);
        return bcrypt.hash(value, salt);
    }

    async compareHash(unHashed: string, hashed: string) : Promise<Boolean> {
        return bcrypt.compare(unHashed, hashed);
    }
}
