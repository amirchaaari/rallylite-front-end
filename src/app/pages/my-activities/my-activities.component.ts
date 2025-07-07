import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchService } from 'src/app/services/match.service';
import { TournamentService } from 'src/app/services/tournament.service'; // Assuming you have this
import { SocketService } from 'src/app/services/socket.service';
declare const bootstrap: any;

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
})
export class MyActivitiesComponent implements OnInit {
  myMatches: any[] = [];
  myTournaments: any[] = [];

  matchForm: FormGroup;
  tournamentForm: FormGroup;

  loadingMatches = true;
  loadingTournaments = true;

  submitting = false;
  error: string | null = null;
  success: string | null = null;

  activeTab: 'createMatch' | 'matches' | 'createTournament' | 'tournaments' | 'requests' = 'createMatch';

  notificationCount = 0; // 🔴 Notification badge for join requests

  @ViewChild('toastBody', { static: true }) toastBody!: ElementRef;
  toastInstance: any;

  currentUserId = localStorage.getItem('userId'); // Make sure you store userId at login

  constructor(
    private matchService: MatchService,
    private tournamentService: TournamentService,
    private fb: FormBuilder,
    private socketService: SocketService,
    private el: ElementRef
  ) {
    // Match form setup
    this.matchForm = this.fb.group({
      sport: ['padel', Validators.required],
      matchType: ['singles', Validators.required],
      location: ['', Validators.required],
      level: ['beginner', Validators.required],
      maxPlayers: [2, [Validators.required, Validators.min(2)]],
      date: ['', Validators.required],
    });

    // Tournament form setup
    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      sport: ['padel', Validators.required],
      numberOfPlayers: [2, [Validators.required, Validators.min(2)]],
      level: ['beginner', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadMatches();
    this.loadTournaments();

    // 🟢 Listen to new join request socket events (matches only)
    this.socketService.onJoinRequest().subscribe((data) => {
      console.log('🔔 New join request received:', data);
      this.loadMatches(); // Refresh matches to get updated join requests
      this.notificationCount++;
      this.success = `New join request for your match in ${data.location}`;
      this.showToast(`📥 New join request from ${data.userName} for a match in ${data.location}`);
    });
  }

  showToast(message: string) {
    const toastEl = this.el.nativeElement.querySelector('#joinRequestToast');
    const toastBody = this.el.nativeElement.querySelector('#toastBody');
    toastBody.innerText = message;

    this.toastInstance = bootstrap.Toast.getOrCreateInstance(toastEl);
    this.toastInstance.show();
  }

  setActiveTab(tab: 'createMatch' | 'matches' | 'createTournament' | 'tournaments' | 'requests') {
    this.activeTab = tab;

    if (tab === 'requests') {
      this.notificationCount = 0;
    }
  }

  hasPendingRequests(): boolean {
    // Only matches have join requests
    return this.myMatches.some((m) => m.joinRequests && m.joinRequests.length > 0);
  }

  // Load matches created by current user
  loadMatches() {
    this.loadingMatches = true;
    this.matchService.getMyActivities().subscribe({
      next: (res) => {
        this.myMatches = res;
        this.loadingMatches = false;
      },
      error: () => {
        this.loadingMatches = false;
      },
    });
  }

  // Load tournaments created by current user
  loadTournaments() {
    this.loadingTournaments = true;
    this.tournamentService.getMyTournaments().subscribe({
      next: (res) => {
        this.myTournaments = res;
        this.loadingTournaments = false;
      },
      error: () => {
        this.loadingTournaments = false;
      },
    });
  }

  // Accept join request only for matches
  acceptRequest(matchId: string, userId: string) {
    this.matchService.acceptJoinRequest(matchId, userId).subscribe(() => {
      this.loadMatches();
    });
  }

  // Create a new match
  createMatch() {
    if (this.matchForm.invalid) return;

    this.submitting = true;
    this.error = null;
    this.success = null;

    this.matchService.createMatch(this.matchForm.value).subscribe({
      next: () => {
        this.matchForm.reset({
          sport: 'padel',
          matchType: 'singles',
          level: 'beginner',
          maxPlayers: 2,
        });
        this.loadMatches();
        this.success = 'Match created successfully!';
      },
      error: (err) => {
        this.error = err.error?.message || 'Error creating match';
        this.submitting = false;
      },
      complete: () => (this.submitting = false),
    });
  }

  // Create a new tournament
  createTournament() {
    if (this.tournamentForm.invalid) return;

    this.submitting = true;
    this.error = null;
    this.success = null;

    this.tournamentService.createTournament(this.tournamentForm.value).subscribe({
      next: () => {
        this.tournamentForm.reset({
          sport: 'padel',
          numberOfPlayers: 2,
          level: 'beginner',
        });
        this.loadTournaments();
        this.success = 'Tournament created successfully!';
      },
      error: (err) => {
        this.error = err.error?.message || 'Error creating tournament';
        this.submitting = false;
      },
      complete: () => (this.submitting = false),
    });
  }

  // Delete a match
  deleteMatch(matchId: string) {
    if (!confirm('Are you sure you want to delete this match?')) return;

    this.submitting = true;
    this.matchService.deleteMatch(matchId).subscribe({
      next: () => {
        this.success = 'Match deleted successfully!';
        this.loadMatches();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error deleting match';
        this.submitting = false;
      },
      complete: () => (this.submitting = false),
    });
  }

  // Delete a tournament
  deleteTournament(tournamentId: string) {
    if (!confirm('Are you sure you want to delete this tournament?')) return;

    this.submitting = true;
    this.tournamentService.deleteTournament(tournamentId).subscribe({
      next: () => {
        this.success = 'Tournament deleted successfully!';
        this.loadTournaments();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error deleting tournament';
        this.submitting = false;
      },
      complete: () => (this.submitting = false),
    });
  }
}
