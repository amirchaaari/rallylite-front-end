import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MyActivitiesComponent } from './pages/my-activities/my-activities.component';
import { HomeComponent } from './pages/home/home.component';
import { TournamentComponent } from './pages/tournament/tournament.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'matches', component: MatchesComponent  },
    { path: 'profile/:id', component: ProfileComponent },

  { path: 'activities', component: MyActivitiesComponent },

  
    { path: '', component: HomeComponent }
,

    //tournament
    {path:'tournaments',component: TournamentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
