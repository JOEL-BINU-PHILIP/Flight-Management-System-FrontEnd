import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { FlightInfoDTO } from '../../models/flight.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.css'
})
export class FlightSearchComponent {
  searchForm:  any = {
    fromPlace: '',
    toPlace: '',
    date: ''
  };

  flights: FlightInfoDTO[] = [];
  isSearched = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private flightService:  FlightService,
    private router: Router
  ) {}

  onSearch(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.flightService.searchFlights(this.searchForm).subscribe({
      next: data => {
        this.flights = data.flights;
        this.isSearched = true;
        this.isLoading = false;
      },
      error: err => {
        this.errorMessage = 'Failed to search flights';
        this.isLoading = false;
      }
    });
  }

  viewDetails(flightId: string): void {
    this.router.navigate(['/flight', flightId]);
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString();
  }
}