// src/app/pages/matches/matches.component.ts
import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
})
export class MatchesComponent implements OnInit {
  matches: any[] = [];
  requestedMatches = new Set<string>();

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches() {
    this.matchService.getAllMatches().subscribe((data) => {
      this.matches = data;
      // Optionally, update requestedMatches here if your API returns info about pending requests
    });
  }

  joinMatch(id: string) {
    this.matchService.joinMatch(id).subscribe(() => {
      this.requestedMatches.add(id);
    });
  }
}