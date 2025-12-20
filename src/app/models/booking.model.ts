export interface PassengerDTO {
    name: string;
    gender:  string;
    age: number;
    seatNumber: string;
    meal: string;
}

export interface BookingRequest {
    flightId: string;
    email: string;
    passengers: PassengerDTO[];
}

export interface BookingResponse {
    pnr: string;
    email: string;
    flightId: string;
    status: string;
}

export interface BookingDTO {
    pnr: string;
    flightId: string;
    email: string;
    seatsBooked: number;
    bookingTime: string;
    cancelled: boolean;
    cancelledAt?: string;
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

export interface TicketResponse {
    booking: BookingDTO;
    passengers: PassengerDTO[];
    flight: FlightInfoDTO;
}

export interface BookingHistory {
    id: string;
    pnr: string;
    email: string;
    flightId: string;
    seatsBooked:  number;
    bookingTime:  string;
    canceled: boolean;
    canceledAt?: string;
}

export interface CancelResponse {
    pnr: string;
    status: string;
}