import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BookingRequest,
  BookingResponse,
  TicketResponse,
  BookingHistory,
  CancelResponse
} from '../models/booking.model';

const BOOKING_API = 'http://localhost:8080/api/book/';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) { }

  bookFlight(BookingRequest: BookingRequest): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(
      BOOKING_API + 'book',
      BookingRequest,
      { withCredentials: true }
    );
  }

  // Get ticket details by PNR
  getTicketByPNR(pnr: string): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(
      BOOKING_API + 'ticket/' + pnr,
      { withCredentials: true }
    );
  }

  // Get booking history by email
  getBookingHistory(email: string): Observable<BookingHistory[]> {
    return this.http.get<BookingHistory[]>(
      BOOKING_API + 'history/' + email,
      { withCredentials: true }
    );
  }

  // Cancel booking by PNR
  cancelBooking(pnr: string): Observable<CancelResponse> {
    return this.http.delete<CancelResponse>(
      BOOKING_API + 'cancel/' + pnr,
      { withCredentials: true }
    );
  }
}