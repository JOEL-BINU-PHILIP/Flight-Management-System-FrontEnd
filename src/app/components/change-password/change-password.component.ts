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
    newPassword: '',
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

  private passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  onSubmit(): void {
    this.isLoading = true;
    this.isFailed = false;
    this.isSuccessful = false;
    this.errorMessage = '';

    const { oldPassword, newPassword, confirmPassword } = this.form;

  
    if (!oldPassword || !newPassword || !confirmPassword) {
      this.fail('All fields are required');
      return;
    }

    if (oldPassword === newPassword) {
      this.fail('New password must be different from current password');
      return;
    }


    if (!this.passwordRegex.test(newPassword)) {
      this.fail(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      this.fail('New passwords do not match');
      return;
    }

    const user = this.tokenStorage.getUser();
    if (!user || !user.email) {
      this.fail('User session not found. Please login again.');
      return;
    }

    const changePasswordRequest: ChangePasswordRequest = {
      email: user.email,
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    this.authService.changePassword(changePasswordRequest).subscribe({
      next: () => {
        this.successMessage = 'Password changed successfully!';
        this.isSuccessful = true;
        this.isLoading = false;

        // Reset form (kept)
        this.form = {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        };

        // Redirect after 2 seconds (kept)
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      },
      error: err => {
        console.error('Change password error:', err);
        this.fail(err.error?.error || 'Failed to change password');
      }
    });
  }

  
  private fail(message: string): void {
    this.errorMessage = message;
    this.isFailed = true;
    this.isLoading = false;
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
