export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role?:  'ROLE_CUSTOMER' | 'ROLE_ADMIN';
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  email: string;
  role: string;
}