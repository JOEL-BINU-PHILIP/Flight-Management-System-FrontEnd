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
  selectedFlight: any = null;
  bookingSuccess = false;
  bookingError = false;
  errorMessage = '';
  isLoading = true;  // ⚠️ Start as true while loading
  bookingResponse: any = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private flightService: FlightService
  ) {
    console.log('🏗️ BookFlightComponent Constructor');
  }

  ngOnInit(): void {
    console. log('🚀 BookFlightComponent ngOnInit');

    // Get flight ID from URL parameter
    const flightId = this.route.snapshot.paramMap. get('flightId');
    console.log('🆔 Flight ID from URL:', flightId);

    if (flightId) {
      // Load flight details from API
      this.loadFlightDetails(flightId);
    } else {
      console.log('❌ No flight ID in URL - redirecting to search');
      this.router.navigate(['/search']);
    }

    // Initialize form
    this.initializeForm();
  }

  initializeForm(): void {
    this.bookingForm = this.fb.group({
      email: ['', [Validators.required, Validators. email]],
      passengers: this.fb.array([this.createPassengerForm()])
    });
  }

  createPassengerForm(): FormGroup {
    return this.fb. group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      seatNumber: ['', Validators.required],
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

  loadFlightDetails(flightId: string): void {
    console.log('📡 Loading flight details for ID:', flightId);
    this.isLoading = true;

    this.flightService.getFlightDetails(flightId).subscribe({
      next: (data) => {
        console.log('Flight details loaded:', data);
        this.selectedFlight = data;
        this. isLoading = false;
      },
      error: (err) => {
        console.error(' Error loading flight:', err);
        this.errorMessage = 'Failed to load flight details';
        this.isLoading = false;
        
        // Redirect after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/search']);
        }, 2000);
      }
    });
  }

  calculateTotalAmount(): number {
    if (!this.selectedFlight) return 0;
    return this. selectedFlight.price * this.passengers.length;
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

    console.log('📤 Submitting booking:', bookingRequest);

    this.flightService.bookFlight(bookingRequest).subscribe({
      next: (response) => {
        console.log('Booking successful:', response);
        this.bookingResponse = response;
        this.bookingSuccess = true;
        this.isLoading = false;
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.error('Booking failed:', err);
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