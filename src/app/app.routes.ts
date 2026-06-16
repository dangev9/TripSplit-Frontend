import { Routes } from '@angular/router';
import {Login} from './features/auth/login/login';
import {Register} from './features/auth/register/register';
import {Dashboard} from './features/dashboard/dashboard';
import {authGuard} from './core/guards/auth.guard';
import {TripDetails} from './features/trip/trip-details/trip-details';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'trips/:id', component: TripDetails, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }
];
