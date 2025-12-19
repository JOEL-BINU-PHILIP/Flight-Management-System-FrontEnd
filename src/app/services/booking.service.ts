import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BookingRequest,
  BookingResponse,
} from '../models/booking.model';

const BOOKING_API = 'http://localhost:8080/api/book/';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) { }
  bookFlight(BookingRequest: BookingRequest): Observable<BookingResponse>{
    return this.http.post<BookingResponse>(
      BOOKING_API + 'book',
      BookingRequest,
      { withCredentials: true }
    );
  }
}
