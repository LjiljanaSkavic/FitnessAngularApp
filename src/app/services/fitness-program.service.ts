import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FitnessProgram, FitnessProgramRequest } from "../models/FitnessProgram";
import { FitnessProgramSearchResult } from "../models/FitnessProgramSearchResult";

@Injectable({
    providedIn: 'root'
})
export class FitnessProgramService {
    baseUrl = "http://localhost:9000/fitness-program";

    constructor(private _httpClient: HttpClient) {
    }

    search(keyword: string, categoryId: number, pageIndex: number, size: number): Observable<FitnessProgramSearchResult> {
        if (!keyword && !categoryId) {
            return this._httpClient.get<FitnessProgramSearchResult>(`${this.baseUrl}/search?page=${pageIndex}&size=${size}`);
        }
        return this._httpClient.get<FitnessProgramSearchResult>(`${this.baseUrl}/search?keyword=${keyword}&category=${categoryId}&page=${pageIndex}&size=${size}`);
    }

    create(fitnessProgram: FitnessProgramRequest): Observable<FitnessProgramRequest> {
        return this._httpClient.post<FitnessProgramRequest>(this.baseUrl, fitnessProgram);
    }

    getById(id: number): Observable<FitnessProgram> {
        return this._httpClient.get<FitnessProgram>(`${this.baseUrl}/${id}`);
    }

    deleteById(id: number): Observable<FitnessProgram> {
        return this._httpClient.delete<FitnessProgram>(`${this.baseUrl}/${id}`);
    }
}
