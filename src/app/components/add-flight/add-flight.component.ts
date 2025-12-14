import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-flight.component.html',
  styleUrl: './add-flight.component.css'
})
export class AddFlightComponent {
  form: any = {
    airlineId: '',
    flightNumber: '',
    fromPlace: '',
    toPlace: '',
    departureTime: '',
    arrivalTime: '',
    price: 0,
    totalSeats: 0
  };

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(private flightService: FlightService) {}

  onSubmit(): void {
    this.isLoading = true;
    this.isFailed = false;
    this.isSuccessful = false;

    // Convert datetime-local to ISO format
    const departureISO = new Date(this.form.departureTime).toISOString().slice(0, 19);
    const arrivalISO = new Date(this.form. arrivalTime).toISOString().slice(0, 19);

    const payload = {
      ... this.form,
      departureTime: departureISO,
      arrivalTime: arrivalISO
    };

    this. flightService.addFlightInventory(this.form.airlineId, payload).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isLoading = false;
        this.resetForm();
      },
      error: err => {
        this. errorMessage = err.error || 'Failed to add flight';
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  resetForm(): void {
    this.form = {
      airlineId: '',
      flightNumber: '',
      fromPlace: '',
      toPlace: '',
      departureTime: '',
      arrivalTime:  '',
      price: 0,
      totalSeats: 0
    };
  }
}
