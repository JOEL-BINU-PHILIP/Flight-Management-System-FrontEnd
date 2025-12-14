import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl:  './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: any = {
    email:  '',
    password: ''
  };
  
  isLoginFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.isLoginFailed = false;

    this.authService.login(this.form).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoading = false;
        this.router.navigate(['/search']);
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