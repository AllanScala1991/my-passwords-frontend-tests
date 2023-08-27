import { Chance } from "chance";

export class ChanceService {
    generateName(): string {
        return Chance().name();
    }

    generateEmail(): string {
        return `${Chance().email({domain: "email.com"})}`
    }

    generatePassword(): string {
        return Chance().string({ symbols: true, length: 8 })
    }
}