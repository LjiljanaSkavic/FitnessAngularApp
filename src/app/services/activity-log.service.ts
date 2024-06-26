import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ActivityLog, ActivityLogRequest } from "../models/activity-log-request";
import { ActivityLogSearchResult } from "../models/activity-log-search-result";

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  baseUrl = "http://localhost:9000/activity-log";

  constructor(private _httpClient: HttpClient) {
  }

  createActivityLog(activityLogRequest: ActivityLogRequest): Observable<ActivityLog> {
    return this._httpClient.put<ActivityLog>(this.baseUrl, activityLogRequest);
  }

  updateActivityLog(activityLogRequest: ActivityLogRequest): Observable<ActivityLog> {
    return this._httpClient.post<ActivityLog>(this.baseUrl, activityLogRequest);
  }

  deleteById(id: number): Observable<ActivityLog> {
    return this._httpClient.delete<ActivityLog>(`${this.baseUrl}/${id}`);
  }

  getAll(userId: number): Observable<ActivityLog[]> {
    const allActivityLogsUrl = `${this.baseUrl}/${userId}`
    return this._httpClient.get<ActivityLog[]>(allActivityLogsUrl);
  }

  search(userId: number, page?: number, size?: number, type?: number, startDate?: Date, endDate?: Date): Observable<ActivityLogSearchResult> {
    return this._httpClient.get<ActivityLogSearchResult>(`${this.baseUrl}/search?appUserId=${userId}&page=${page}&size=${size}`);
  }

  downloadActivityLogs(userId: number): Observable<Blob> {
    const headers = new HttpHeaders({'Content-Type': 'application/pdf'});
    const downloadActivityLogsUrl = `${this.baseUrl}/download/${userId}`;
    return this._httpClient.get(downloadActivityLogsUrl, {responseType: 'arraybuffer', headers})
      .pipe(
        map((data: ArrayBuffer) => {
          return new Blob([data], {type: 'application/pdf'});
        })
      );
  }
}
