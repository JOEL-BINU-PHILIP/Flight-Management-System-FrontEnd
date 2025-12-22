export interface ChangePasswordRequest {
  email: string;
  oldPassword: string;
  newPassword:  string;
}

export interface ChangePasswordResponse {
  message: string;
}