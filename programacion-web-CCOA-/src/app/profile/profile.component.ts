import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container" *ngIf="user">
      <div class="profile-header">
        <div class="profile-avatar">
          <img [src]="user?.avatar || 'https://via.placeholder.com/150'" alt="User Profile Picture">
        </div>
        <div class="profile-details">
          <h2>{{ user?.name }}</h2>
          <p class="profile-title">{{ user?.role }}</p>
          <p class="profile-email">{{ user?.email }}</p>
        </div>
      </div>
      <div class="profile-body">
        <h3>About Me</h3>
        <p>Hello, {{ user?.name }}! Welcome to your profile.</p>
        <div class="profile-info">
          <div class="info-item">
            <h4>Created At</h4>
            <p>{{ user?.creationAt | date:'longDate' }}</p>
          </div>
          <div class="info-item">
            <h4>Last Updated</h4>
            <p>{{ user?.updatedAt | date:'longDate' }}</p>
          </div>
        </div>
        <button class="logout-button" (click)="logout()">Logout</button>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      border-radius: 15px;
      background: linear-gradient(to bottom right, #f9f9f9, #e3f2fd);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      font-family: 'Arial', sans-serif;
      color: #333;
    }

    .profile-header {
      display: flex;
      align-items: center;
      border-bottom: 2px solid #ddd;
      padding-bottom: 20px;
      margin-bottom: 20px;
    }

    .profile-avatar img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .profile-details {
      margin-left: 20px;
    }

    .profile-details h2 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
      color: #1976d2;
    }

    .profile-title {
      margin: 5px 0;
      font-size: 18px;
      color: #5c6bc0;
    }

    .profile-email {
      font-size: 14px;
      color: #757575;
    }

    .profile-body {
      padding: 20px 0;
    }

    .profile-body h3 {
      margin-bottom: 15px;
      font-size: 22px;
      color: #333;
    }

    .profile-body p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
      color: #444;
    }

    .profile-info {
      display: flex;
      justify-content: space-between;
      gap: 20px;
    }

    .info-item {
      flex: 1;
      padding: 15px;
      background: #e3f2fd;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .info-item h4 {
      font-size: 18px;
      margin-bottom: 5px;
      color: #1976d2;
    }

    .info-item p {
      font-size: 16px;
      color: #444;
    }

    .logout-button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background: #d32f2f;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .logout-button:hover {
      background: #b71c1c;
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      console.error('No user is logged in');
    }
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
