import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Category } from "../models/dto/Category";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = "http://localhost:9000/categories";

  constructor(private _httpClient: HttpClient) {
  }

  getAll(): Observable<Category> {
    return this._httpClient.get<Category>(this.baseUrl);
  }
}
