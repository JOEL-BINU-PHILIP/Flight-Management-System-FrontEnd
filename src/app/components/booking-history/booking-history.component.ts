import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { BookingHistory } from '../../models/booking.model';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  bookings: BookingHistory[] = [];
  loading: boolean = false;
  error: string = '';
  userEmail: string = '';

  constructor(
    private bookingService:  BookingService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    const user = this.tokenStorage.getUser();
    this.userEmail = user?. email || '';
    
    if (this.userEmail) {
      this.loadBookingHistory();
    } else {
      this.error = 'User email not found.  Please login again.';
    }
  }

  loadBookingHistory(): void {
    this.loading = true;
    this. error = '';

    this.bookingService.getBookingHistory(this.userEmail).subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load booking history';
        this.loading = false;
      }
    });
  }

  cancelBooking(pnr: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(pnr).subscribe({
        next: (response) => {
          alert(`Booking cancelled successfully. Status: ${response.status}`);
          this.loadBookingHistory(); // Reload the list
        },
        error: (err) => {
          alert(err.error?.message || 'Failed to cancel booking');
        }
      });
    }
  }
}