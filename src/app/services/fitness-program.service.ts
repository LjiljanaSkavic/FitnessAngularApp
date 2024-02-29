import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FitnessProgram } from "../models/FitnessProgram";

@Injectable({
  providedIn: 'root'
})
export class FitnessProgramService {
  baseUrl = "http://localhost:9000/fitness-program";

  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<FitnessProgram[]> {
    return this._httpClient.get<FitnessProgram[]>(this.baseUrl);
  }

  getById(id: number): Observable<FitnessProgram> {
    return this._httpClient.get<FitnessProgram>(`${this.baseUrl}/${id}`);
  }
}
