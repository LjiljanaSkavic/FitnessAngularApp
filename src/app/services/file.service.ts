import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IFile } from "../models/IFile";

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

    uploadFile(file: any): Observable<IFile> {
        const formData = new FormData();
        formData.append('file', file);

        return this._httpClient.post<IFile>(`${this.baseUrl}/upload`, formData);
    }
}
