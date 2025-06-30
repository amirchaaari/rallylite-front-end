import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private baseUrl = 'http://localhost:3000/matches';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getAllMatches(filters: any = {}) {
    return this.http.get<any[]>(this.baseUrl, {
      ...this.getAuthHeaders(),
      params: filters,
    });
  }

  joinMatch(matchId: string) {
    return this.http.post(`${this.baseUrl}/${matchId}/join`, {}, this.getAuthHeaders());
  }
}
