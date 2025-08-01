import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private baseUrl = `${environment.apiUrl}/matches`;

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


    deleteMatch(matchId: string) {
    return this.http.post(`${this.baseUrl}/${matchId}/delete`, {}, this.getAuthHeaders());
  }

getMyActivities() {
  return this.http.get<any[]>(`${this.baseUrl}/me`, this.getAuthHeaders());
}



  createMatch(matchData: any) {
    return this.http.post(this.baseUrl, matchData, this.getAuthHeaders());
  }
  acceptJoinRequest(matchId: string, playerId: string) {
    return this.http.post(
      `${this.baseUrl}/${matchId}/accept/${playerId}`,
      {},
      this.getAuthHeaders()
    );
  }
  


}
