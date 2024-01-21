import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NINJA_API_KEY } from "../constants/git-ignore-constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExercisesService {
  ninjasUrl = 'https://api.api-ninjas.com/v1/exercises';

  constructor(private _httpClient: HttpClient) {
  }

  getExercises(): Observable<any> {
    const headers = new HttpHeaders({
      'X-Api-Key': NINJA_API_KEY,
      'Content-Type': 'application/json'
    });
    return this._httpClient.get(this.ninjasUrl, {headers});
  }
}
