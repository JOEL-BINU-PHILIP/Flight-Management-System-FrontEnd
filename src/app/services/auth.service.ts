import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, SignupRequest, AuthResponse } from '../models/auth.model';

const AUTH_API = 'http://localhost:8080/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      AUTH_API + 'login', 
      credentials,
      { withCredentials: true }  
    );
  }

  register(data: SignupRequest): Observable<any> {
    return this.http.post(
      AUTH_API + 'register', 
      data,
      { withCredentials: true } 
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      AUTH_API + 'logout', 
      {},
      { withCredentials: true }  
    );
  }
}