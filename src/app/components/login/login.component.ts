import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector:  'app-login',
  standalone: true,
  imports:  [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  form:  any = {
    email: '',
    password: ''
  };
  
  isLoginFailed = false;
  isLoginSuccessful = false;  
  errorMessage = '';
  successMessage = '';  // ✅ NEW
  isLoading = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this. isLoginFailed = false;
    this.isLoginSuccessful = false;

    this.authService.login(this.form).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        
        // ✅ Determine role and show success message
        const role = data.role === 'ROLE_ADMIN' ? 'Admin' : 'Customer';
        this.successMessage = `✅ Logged in as ${role}`;
        
        this.isLoginSuccessful = true;
        this.isLoginFailed = false;
        this.isLoading = false;

        // ✅ Reload navbar to show logged-in state
        window.location.reload();
      },
      error: err => {
        this.errorMessage = 'Invalid email or password';
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    });
  }
}