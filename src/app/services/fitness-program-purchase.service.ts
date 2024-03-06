import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FitnessProgramPurchaseRequest } from "../models/FitnessProgramPurchaseRequest";
import { Observable } from "rxjs";

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
}
