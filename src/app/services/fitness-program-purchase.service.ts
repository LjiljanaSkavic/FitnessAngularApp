import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FitnessProgramPurchaseRequest } from "../models/FitnessProgramPurchaseRequest";
import { Observable } from "rxjs";
import { FitnessProgramPurchase } from "../models/FitnessProgramPurchase";

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

  getAll(userId: number): Observable<FitnessProgramPurchase[]> {
    return this._httpClient.get<FitnessProgramPurchase[]>(`${this.baseUrl}/${userId}`);
  }

  deleteById(purchaseId: number): Observable<any> {
    return this._httpClient.delete<FitnessProgramPurchase>(`${this.baseUrl}/${purchaseId}`);
  }
}
