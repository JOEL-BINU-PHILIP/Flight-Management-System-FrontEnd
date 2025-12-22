import { Component, OnInit } from '@angular/core';
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
export class FlightSearchComponent implements OnInit {
  searchForm:  any = {
    fromPlace: '',
    toPlace: '',
    date:  ''
  };

  flights: FlightInfoDTO[] = [];
  isSearched = false;
  isLoading = false;
  errorMessage = '';
  minDate:  string = '';  
  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setMinDate();
  }

  setMinDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today. getMonth() + 1).padStart(2, '0');
    const day = String(today. getDate()).padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  onSearch(): void {
    this.isLoading = true;
    this. errorMessage = '';

    this.flightService.searchFlights(this.searchForm).subscribe({
      next: data => {
        this.flights = data. flights;
        this.isSearched = true;
        this. isLoading = false;
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

  bookFlight(flight: FlightInfoDTO): void {
    console.log('Booking flight with ID:', flight.id);
    this.router.navigate(['/book-flight', flight.id]);
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString();
  }
}