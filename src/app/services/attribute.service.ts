import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Attribute } from "../models/dto/attribute";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  private baseUrl = "http://localhost:9000/attribute"

  constructor(private _httpClient: HttpClient) {
  }

  getAttributesFromCategory(categoryId: number): Observable<Attribute[]> {
    const childrenUrl = `${this.baseUrl}/category/${categoryId}`;
    return this._httpClient.get<Attribute[]>(childrenUrl);
  }

}
