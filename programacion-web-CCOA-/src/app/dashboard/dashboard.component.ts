import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { UserComponent } from '../users/users.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgFor, NgIf, UserComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menuItems = [
    { name: 'PERFIL', link: '/dashboard/profile' },
    { name: 'CONFIGURACION', link: '/dashboard/settings' },
    { name: 'PRIVACIDAD', link: '/dashboard/privacy' },
    { name: 'ANUNCIOS', link: '/dashboard/ads' },
    { name: 'POKEMONES', link: '/dashboard/users' }
  ];

  currentUser?: User;
  showDropdown: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    } else {
      // If no user is logged in, redirect to login
      this.router.navigate(['/login']);
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }

  closeDropdown(event: Event) {
    if (!(event.target as HTMLElement).closest('.user-profile')) {
      this.showDropdown = false;
    }
  }
}