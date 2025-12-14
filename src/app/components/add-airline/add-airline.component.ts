import { Component } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-airline',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-airline.component.html',
  styleUrl: './add-airline.css'
})
export class AddAirlineComponent {
  form: any = {
    name:  '',
    logoUrl: ''
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

    this.flightService.addAirline(this.form).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isLoading = false;
        this.form = { name: '', logoUrl: '' };
      },
      error: err => {
        this.errorMessage = err.error || 'Failed to add airline';
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }
}