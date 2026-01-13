/*
Class to validate if a given number is an integer between 3 and 7 (inclusive).
Used to ensure there are between 3 and 7 buttons displayed for the memory game.
*/
export class Validator {
    static isValidNumber(value) {
        const n = Number(value);
        return Number.isInteger(n) && n >= 3 && n <= 7;
    }
}
