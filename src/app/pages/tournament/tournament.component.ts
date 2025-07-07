import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournament.component.html',
})
export class TournamentComponent implements OnInit {
  tournaments: any[] = [];
  joinedTournaments = new Set<string>(); // Track joined tournament IDs

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.loadTournaments();
  }

  loadTournaments() {
    this.tournamentService.getAllTournaments().subscribe((data) => {
      this.tournaments = data;

      // Optionally: if you want to track which tournaments user already joined,
      // you can initialize joinedTournaments here based on user data, if available
    });
  }

  deleteTournament(id: string) {
    this.tournamentService.deleteTournament(id).subscribe(() => {
      this.tournaments = this.tournaments.filter(t => t._id !== id);
      this.joinedTournaments.delete(id);
    });
  }

  joinTournament(id: string) {
    this.tournamentService.joinTournament(id).subscribe(() => {
      this.joinedTournaments.add(id);
      console.log(`Joined tournament with ID: ${id}`);
    });
  }
}
