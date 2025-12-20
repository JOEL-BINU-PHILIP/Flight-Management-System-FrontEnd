import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { TicketResponse } from '../../models/booking.model';

@Component({
  selector: 'app-view-ticket',
  standalone:  true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent {
  pnr: string = '';
  ticket: TicketResponse | null = null;
  loading:  boolean = false;
  error: string = '';

  constructor(private bookingService: BookingService) {}

  searchTicket(): void {
    if (!this.pnr. trim()) {
      this.error = 'Please enter a PNR number';
      return;
    }

    this.loading = true;
    this.error = '';
    this.ticket = null;

    this.bookingService.getTicketByPNR(this.pnr).subscribe({
      next: (data) => {
        this.ticket = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to fetch ticket details';
        this.loading = false;
      }
    });
  }

  printTicket(): void {
    window.print();
  }
}