import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  SearchFlightRequest,
  SearchFlightResponse,
  FlightInfoDTO,
  AddAirlineRequest,
  AddInventoryRequest
} from '../models/flight.model';

const FLIGHT_API = 'http://localhost:8080/api/flight/';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  searchFlights(searchRequest: SearchFlightRequest): Observable<SearchFlightResponse> {
    return this.http.post<SearchFlightResponse>(
      FLIGHT_API + 'search',
      searchRequest,
      { withCredentials: true }
    );
  }

  getFlightDetails(flightId: string): Observable<FlightInfoDTO> {
    return this.http.get<FlightInfoDTO>(
      FLIGHT_API + 'details/' + flightId,
      { withCredentials: true }
    );
  }

  addAirline(airline: AddAirlineRequest): Observable<string> {
    return this.http.post(
      FLIGHT_API + 'airline',
      airline,
      { responseType: 'text', withCredentials: true }
    );
  }

  addFlightInventory(airlineId: string, inventory: AddInventoryRequest): Observable<string> {
    return this.http.post(
      FLIGHT_API + `airline/${airlineId}/inventory`,
      inventory,
      { responseType: 'text', withCredentials: true }
    );
  }
}