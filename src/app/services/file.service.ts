import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl = "http://localhost:9000/files";

  constructor(private _httpClient: HttpClient) {
  }

  getFileById(id: number): Observable<Blob> {
    return this._httpClient.get(`${this.baseUrl}/${id}`, {responseType: 'blob'});
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this._httpClient.post<any>(`${this.baseUrl}/upload`, formData);
  }
}
