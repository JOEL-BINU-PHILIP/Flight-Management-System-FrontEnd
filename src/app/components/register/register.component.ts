import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register. component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: any = {
    name: '',
    email:  '',
    password: '',
    role: 'ROLE_CUSTOMER'
  };
  
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.isSignUpFailed = false;

    this. authService.register(this.form).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: err => {
        this.errorMessage = err.error. error || 'Registration failed';
        this.isSignUpFailed = true;
        this.isLoading = false;
      }
    });
  }
}