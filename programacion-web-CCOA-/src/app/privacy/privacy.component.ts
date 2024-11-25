import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="privacy-container">
      <h2>Privacy Settings</h2>

      <div class="privacy-section">
        <h3>Profile Visibility</h3>
        <div class="privacy-item">
          <label>Show Profile to Public</label>
          <input type="checkbox">
        </div>
        <div class="privacy-item">
          <label>Show Online Status</label>
          <input type="checkbox" checked>
        </div>
      </div>

      <div class="privacy-section">
        <h3>Data Access</h3>
        <div class="privacy-item">
          <label>Allow Location Tracking</label>
          <input type="checkbox">
        </div>
        <div class="privacy-item">
          <label>Share Data with Partners</label>
          <input type="checkbox">
        </div>
      </div>

      <div class="privacy-section">
        <h3>Security</h3>
        <div class="privacy-item">
          <label>Enable Two-Factor Authentication</label>
          <input type="checkbox" checked>
        </div>
        <div class="privacy-item">
          <label>Allow Login Notifications</label>
          <input type="checkbox">
        </div>
      </div>

      <button class="save-button">Save Privacy Settings</button>
    </div>
  `,
  styles: [`
    .privacy-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      border-radius: 8px;
      background: #f0f4f8;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
      color: #333;
    }

    .privacy-container h2 {
      text-align: center;
      color: #333;
    }

    .privacy-section {
      margin-bottom: 20px;
      padding: 15px;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .privacy-section h3 {
      margin: 0 0 10px;
      color: #555;
    }

    .privacy-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .privacy-item label {
      font-size: 16px;
      color: #666;
    }

    input[type="checkbox"] {
      transform: scale(1.2);
      accent-color: #4a90e2;
    }

    .save-button {
      display: block;
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 6px;
      background-color: #4a90e2;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .save-button:hover {
      background-color: #357abd;
    }
  `]
})
export class PrivacyComponent {}
