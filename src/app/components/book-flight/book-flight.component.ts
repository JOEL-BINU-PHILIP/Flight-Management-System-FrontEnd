import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-book-flight',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl:  './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {
  bookingForm! : FormGroup;
  selectedFlight:  any = null;
  bookingSuccess = false;
  bookingError = false;
  errorMessage = '';
  isLoading = false;
  bookingResponse: any = null;

  constructor(
    private fb:  FormBuilder,
    private route:  ActivatedRoute,
    private router: Router,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    // Get flight details from route state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras. state) {
      this.selectedFlight = navigation.extras.state['flight'];
    }

    // If no flight data, try to get from route params
    if (!this.selectedFlight) {
      const flightId = this.route.snapshot.paramMap.get('flightId');
      if (flightId) {
        this.loadFlightDetails(flightId);
      } else {
        this.router. navigate(['/search']);
      }
    }

    this.initializeForm();
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passengers: this.fb.array([this.createPassengerForm()])
    });
  }

  createPassengerForm(): FormGroup {
    return this.fb. group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      seatNumber:  ['', Validators.required],
      meal: ['', Validators.required]
    });
  }

  get passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  addPassenger(): void {
    if (this.passengers.length < (this.selectedFlight?.availableSeats || 0)) {
      this.passengers.push(this.createPassengerForm());
    }
  }

  removePassenger(index: number): void {
    if (this.passengers.length > 1) {
      this.passengers.removeAt(index);
    }
  }

  loadFlightDetails(flightId:  string): void {
    this.flightService.getFlightDetails(flightId).subscribe({
      next: (data) => {
        this.selectedFlight = data;
      },
      error: (err) => {
        console.error('Error loading flight:', err);
        this.router.navigate(['/search']);
      }
    });
  }

  calculateTotalAmount(): number {
    if (!this.selectedFlight) return 0;
    return this. selectedFlight.price * this. passengers.length;
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleString();
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.bookingError = false;
    this.bookingSuccess = false;

    const bookingRequest = {
      flightId: this.selectedFlight. id,
      email: this.bookingForm.value.email,
      passengers: this.bookingForm.value.passengers
    };

    console.log('Booking Request:', bookingRequest);

    this.flightService.bookFlight(bookingRequest).subscribe({
      next: (response) => {
        console.log('Booking Response:', response);
        this.bookingResponse = response;
        this.bookingSuccess = true;
        this.isLoading = false;
        
        // Scroll to success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.error('Booking Error:', err);
        this.errorMessage = err.error?.message || 'Failed to book flight.  Please try again.';
        this.bookingError = true;
        this.isLoading = false;
      }
    });
  }

  viewTicket(): void {
    if (this.bookingResponse?. pnr) {
      this.router.navigate(['/ticket', this.bookingResponse.pnr]);
    }
  }
}