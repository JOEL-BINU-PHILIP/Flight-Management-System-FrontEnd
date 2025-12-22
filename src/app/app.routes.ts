import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { AddAirlineComponent } from './components/add-airline/add-airline.component';
import { AddFlightComponent } from './components/add-flight/add-flight.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';
import { ViewTicketComponent } from './components/view-ticket/view-ticket.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: FlightSearchComponent, canActivate: [authGuard] },
  { path: 'flight/:id', component: FlightDetailsComponent, canActivate: [authGuard] },
  { path: 'add-airline', component: AddAirlineComponent, canActivate: [authGuard] },
  { path: 'add-flight', component: AddFlightComponent, canActivate: [authGuard] },
  { path: 'book-flight', component: BookFlightComponent, canActivate: [authGuard] },
  { path: 'book-flight/:flightId', component: BookFlightComponent, canActivate: [authGuard] },
  { path: 'view-ticket', component: ViewTicketComponent, canActivate: [authGuard] },
  { path: 'booking-history', component: BookingHistoryComponent, canActivate: [authGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' }
];