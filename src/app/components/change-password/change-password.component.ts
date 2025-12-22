import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { ChangePasswordRequest } from '../../models/change-password.model';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  form: any = {
    oldPassword: '',
    newPassword:  '',
    confirmPassword: ''
  };

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this. isFailed = false;
    this.isSuccessful = false;
    this.errorMessage = '';

    // Validate passwords match
    if (this.form.newPassword !== this.form. confirmPassword) {
      this.errorMessage = 'New passwords do not match';
      this.isFailed = true;
      this.isLoading = false;
      return;
    }

    // Validate password length
    if (this. form.newPassword.length < 6) {
      this.errorMessage = 'New password must be at least 6 characters long';
      this.isFailed = true;
      this.isLoading = false;
      return;
    }

    const user = this.tokenStorage.getUser();
    if (!user || !user.email) {
      this.errorMessage = 'User session not found.  Please login again.';
      this.isFailed = true;
      this.isLoading = false;
      return;
    }

    const changePasswordRequest: ChangePasswordRequest = {
      email: user.email,
      oldPassword: this.form.oldPassword,
      newPassword: this. form.newPassword
    };

    this.authService.changePassword(changePasswordRequest).subscribe({
      next: data => {
        this.successMessage = 'Password changed successfully!';
        this.isSuccessful = true;
        this.isLoading = false;
        
        // Reset form
        this.form = {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        };

        // Redirect to home after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: err => {
        console.error('Change password error:', err);
        this.errorMessage = err.error?.error || 'Failed to change password';
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}