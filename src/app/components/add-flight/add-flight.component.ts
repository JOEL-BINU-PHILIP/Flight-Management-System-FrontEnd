import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';
import { Airline } from '../../models/flight.model';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.css'
})
export class AddFlightComponent implements OnInit {
  form:  any = {
    airlineId: '',
    flightNumber: '',
    fromPlace: '',
    toPlace: '',
    departureTime: '',
    arrivalTime: '',
    price:  0,
    totalSeats: 0
  };

  airlines: Airline[] = [];
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  isLoading = false;
  isLoadingAirlines = false;
  minDateTime:  string = '';

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.setMinDateTime();
    this.loadAirlines();
  }

  setMinDateTime(): void {
    // Set minimum date/time to current date and time
    const now = new Date();
    // Format: YYYY-MM-DDTHH:MM (for datetime-local input)
    const year = now.getFullYear();
    const month = String(now. getMonth() + 1).padStart(2, '0');
    const day = String(now. getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  loadAirlines(): void {
    this.isLoadingAirlines = true;
    this.flightService. getAllAirlines().subscribe({
      next: data => {
        this.airlines = data;
        this.isLoadingAirlines = false;
      },
      error: err => {
        console.error('Error loading airlines:', err);
        this.errorMessage = 'Failed to load airlines';
        this.isFailed = true;
        this.isLoadingAirlines = false;
      }
    });
  }

  validateDateTime(): boolean {
    const now = new Date();
    const departure = new Date(this.form.departureTime);
    const arrival = new Date(this.form.arrivalTime);

    // Check if departure time is in the past
    if (departure < now) {
      this.errorMessage = 'Departure time cannot be in the past';
      this.isFailed = true;
      return false;
    }

    // Check if arrival time is in the past
    if (arrival < now) {
      this.errorMessage = 'Arrival time cannot be in the past';
      this.isFailed = true;
      return false;
    }

    // Check if arrival is before departure
    if (arrival <= departure) {
      this.errorMessage = 'Arrival time must be after departure time';
      this.isFailed = true;
      return false;
    }

    return true;
  }

  onSubmit(): void {
    this.isLoading = true;
    this. isFailed = false;
    this.isSuccessful = false;

    // Validate date/time
    if (!this. validateDateTime()) {
      this.isLoading = false;
      return;
    }

    // Convert datetime-local to ISO format
    const departureISO = new Date(this.form.departureTime).toISOString().slice(0, 19);
    const arrivalISO = new Date(this.form. arrivalTime).toISOString().slice(0, 19);

    const payload = {
      ...this.form,
      departureTime: departureISO,
      arrivalTime: arrivalISO
    };

    this.flightService.addFlightInventory(this.form. airlineId, payload).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isLoading = false;
        this. resetForm();
      },
      error: err => {
        this.errorMessage = err.error || 'Failed to add flight';
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  resetForm(): void {
    this.form = {
      airlineId:  '',
      flightNumber: '',
      fromPlace: '',
      toPlace: '',
      departureTime: '',
      arrivalTime: '',
      price: 0,
      totalSeats: 0
    };
  }
}