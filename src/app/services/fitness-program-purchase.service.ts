import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FitnessProgramPurchaseRequest } from "../models/fitness-program-purchase-request";
import { Observable } from "rxjs";
import { FitnessProgramPurchase } from "../models/fitness-program-purchase";
import { FitnessProgramPurchaseSearchResult } from "../models/activity-log-search-result";

@Injectable({
  providedIn: 'root'
})
export class FitnessProgramPurchaseService {
  baseUrl = "http://localhost:9000/fitness-program-purchase";

  constructor(private _httpClient: HttpClient) {
  }

  createPurchase(purchase: FitnessProgramPurchaseRequest): Observable<FitnessProgramPurchaseRequest> {
    return this._httpClient.post<FitnessProgramPurchaseRequest>(this.baseUrl, purchase)
  }

  search(userId: number, page?: number, size?: number): Observable<FitnessProgramPurchaseSearchResult> {
    return this._httpClient.get<FitnessProgramPurchaseSearchResult>(`${this.baseUrl}/search?appUserId=${userId}&page=${page}&size=${size}`);
  }

  deleteById(purchaseId: number): Observable<any> {
    return this._httpClient.delete<FitnessProgramPurchase>(`${this.baseUrl}/${purchaseId}`);
  }
}
