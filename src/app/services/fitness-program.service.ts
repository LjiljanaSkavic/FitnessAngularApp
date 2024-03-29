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

    search(keyword: string, categoryId: number, userId: number, isCompleted: boolean, page: number, size: number): Observable<FitnessProgramSearchResult> {
        let url = `${this.baseUrl}/search`;

        const queryParams = {};
        if (keyword) {
            queryParams['keyword'] = keyword;
        }
        if (categoryId && categoryId !== 0) {
            queryParams['category'] = categoryId;
        }
        if (userId) {
            queryParams['userId'] = userId;
        }
        if (isCompleted) {
            queryParams['isCompleted'] = isCompleted;
        }
        if (page) {
            queryParams['page'] = page;
        }
        if (size) {
            queryParams['size'] = size;
        }

        const queryString = Object.keys(queryParams).map(key => key + '=' + queryParams[key]).join('&');
        if (queryString) {
            url += '?' + queryString;
        }
        return this._httpClient.get<FitnessProgramSearchResult>(url);
    }

    create(fitnessProgram: FitnessProgramRequest): Observable<FitnessProgramRequest> {
        console.log('create', fitnessProgram)
        return this._httpClient.post<FitnessProgramRequest>(this.baseUrl, fitnessProgram);
    }

    getById(id: number): Observable<FitnessProgram> {
        return this._httpClient.get<FitnessProgram>(`${this.baseUrl}/${id}`);
    }

    deleteById(id: number): Observable<FitnessProgram> {
        return this._httpClient.delete<FitnessProgram>(`${this.baseUrl}/${id}`);
    }

    setAsCompletedById(id: number): Observable<boolean> {
        return this._httpClient.post<boolean>(`${this.baseUrl}/${id}`, {});
    }
}
