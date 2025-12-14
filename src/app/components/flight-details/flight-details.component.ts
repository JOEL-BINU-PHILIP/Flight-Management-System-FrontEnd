import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { FlightInfoDTO } from '../../models/flight.model';
import { CommonModule } from '@angular/common';

@Component({
  selector:  'app-flight-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.css'
})
export class FlightDetailsComponent implements OnInit {
  flight?:  FlightInfoDTO;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route:  ActivatedRoute,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot. paramMap.get('id');
    if (id) {
      this.flightService.getFlightDetails(id).subscribe({
        next: data => {
          this. flight = data;
          this. isLoading = false;
        },
        error: err => {
          this.errorMessage = 'Failed to load flight details';
          this.isLoading = false;
        }
      });
    }
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString();
  }
}