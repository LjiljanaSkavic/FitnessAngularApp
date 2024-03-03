import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FitnessProgram } from "../models/FitnessProgram";
import { FitnessProgramCard } from "../models/FitnessProgramCard";
import { FitnessProgramSearchResult } from "../models/FitnessProgramSearchResult";

@Injectable({
  providedIn: 'root'
})
export class FitnessProgramService {
  baseUrl = "http://localhost:9000/fitness-program";

  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<FitnessProgramCard[]> {
    return this._httpClient.get<FitnessProgramCard[]>(this.baseUrl);
  }

  search(keyword: string, categoryId: number, page: number, size: number): Observable<FitnessProgramSearchResult> {
    if (!keyword && !categoryId) {
      return this._httpClient.get<FitnessProgramSearchResult>(`${this.baseUrl}/search?&page=${page}&=${size}`);
    }
    return this._httpClient.get<FitnessProgramSearchResult>(`${this.baseUrl}/search?keyword=${keyword}&category=${categoryId}&page=${page}&=${size}`);
  }

  getById(id: number): Observable<FitnessProgram> {
    return this._httpClient.get<FitnessProgram>(`${this.baseUrl}/${id}`);
  }
}
