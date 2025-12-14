import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, SignupRequest, AuthResponse } from '../models/auth.model';

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_API + 'login', credentials, httpOptions);
  }

  register(userData: SignupRequest): Observable<any> {
    return this.http.post(AUTH_API + 'register', userData, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', {}, httpOptions);
  }
}