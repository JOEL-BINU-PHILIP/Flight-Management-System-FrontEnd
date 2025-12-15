import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector:  'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  form: any = {
    email:  '',
    password: ''
  };
  
  isLoginFailed = false;
  isLoginSuccessful = false;  
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private tokenStorage:  TokenStorageService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this. isLoginFailed = false;
    this.isLoginSuccessful = false;

    console.log('🔐 Login - Attempting login for:', this.form.email);

    this.authService.login(this.form).subscribe({
      next: data => {
        console.log('✅ Login Success:', data);
        
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        
        const role = data.role === 'ROLE_ADMIN' ? 'Admin' : 'Customer';
        this.successMessage = `✅ Logged in as ${role}`;
        
        this.isLoginSuccessful = true;
        this.isLoginFailed = false;
        this.isLoading = false;

        console.log('🔐 Token saved:', this.tokenStorage.getToken());

        // Reload navbar to show logged-in state
        setTimeout(() => {
          this.router.navigate(['/search']);
          window.location.reload();
        }, 1000);
      },
      error: err => {
        console.error('❌ Login Failed:', err);
        this.errorMessage = 'Invalid email or password';
        this.isLoginFailed = true;
        this.isLoading = false;
      }
    });
  }
}