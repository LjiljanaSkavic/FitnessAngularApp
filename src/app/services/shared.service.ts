import { Injectable } from '@angular/core';
import * as sha512 from 'js-sha512';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor() {
    }

    getSha512Hash(input: string): string {
        return sha512.sha512(input);
    }

    getRandomEightCharactersLongString(): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 8) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    toCamelCase(input: string): string {
        return input.replace(/\s+/g, '') // Remove spaces
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase()) // Convert to camelCase
            .replace(/\s+/g, ''); // Remove any remaining spaces
    }
}
