export interface PassengerDTO {
    name: string;
    gender: string;
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