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
}
