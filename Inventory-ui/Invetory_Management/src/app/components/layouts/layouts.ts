import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router'; // Ekhane change kora hoyeche
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-layouts',
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterLink,         
    RouterLinkActive,   
    RouterModule
  ],
  templateUrl: './layouts.html',
  styleUrl: './layouts.scss',
})
export class Layouts {
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
