import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector:   'app-navbar',
  standalone: true,
  imports:   [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username? :  string;
  role?:  string;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.username = user.email;
      this.role = user.role;
    }
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
    window.location.reload();
  }

  isAdmin(): boolean {
    return this. role === 'ROLE_ADMIN';
  }

  isCustomer(): boolean {
    return this.role === 'ROLE_CUSTOMER';
  }
}