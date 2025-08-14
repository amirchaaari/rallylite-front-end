import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private baseUrl = `${environment.apiUrl}/tournaments`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getAllTournaments(filters: any = {}) {
    return this.http.get<any[]>(this.baseUrl, {
      ...this.getAuthHeaders(),
      params: filters,
    });
  }

  joinTournament(tournamentId: string) {
    return this.http.post(`${this.baseUrl}/${tournamentId}/join`, {}, this.getAuthHeaders());
  }

  createTournament(tournamentData: any) {
    return this.http.post(this.baseUrl, tournamentData, this.getAuthHeaders());
  }

  deleteTournament(tournamentId: string) {
    return this.http.post(`${this.baseUrl}/${tournamentId}/delete`, {}, this.getAuthHeaders());
  }

  getMyTournaments() {
    return this.http.get<any[]>(`${this.baseUrl}/me`, this.getAuthHeaders());
  }
}
