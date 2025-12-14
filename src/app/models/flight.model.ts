export interface SearchFlightRequest {
  fromPlace: string;
  toPlace:  string;
  date: string; // YYYY-MM-DD
}

export interface FlightInfoDTO {
  id: string;
  flightNumber: string;
  airlineName: string;
  fromPlace: string;
  toPlace: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

export interface SearchFlightResponse {
  flights:  FlightInfoDTO[];
}

export interface AddAirlineRequest {
  name:  string;
  logoUrl:  string;
}

export interface AddInventoryRequest {
  airlineId?:  string;
  flightNumber:  string;
  fromPlace: string;
  toPlace: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  totalSeats: number;
}