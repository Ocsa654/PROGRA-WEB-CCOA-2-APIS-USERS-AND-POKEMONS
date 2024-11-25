import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="settings-container">
      <h2>Settings</h2>

      <div class="settings-section">
        <h3>General</h3>
        <div class="setting-item">
          <label>Language</label>
          <select>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div class="setting-item">
          <label>Theme</label>
          <select>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div class="settings-section">
        <h3>Notifications</h3>
        <div class="setting-item">
          <label>Email Notifications</label>
          <input type="checkbox" checked>
        </div>
        <div class="setting-item">
          <label>Push Notifications</label>
          <input type="checkbox">
        </div>
      </div>

      <div class="settings-section">
        <h3>Privacy</h3>
        <div class="setting-item">
          <label>Location Access</label>
          <input type="checkbox" checked>
        </div>
        <div class="setting-item">
          <label>Allow data collection</label>
          <input type="checkbox">
        </div>
      </div>

      <button class="save-button">Save Changes</button>
    </div>
  `,
  styles: [`
    .settings-container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background: #f0f4f8;
      font-family: Arial, sans-serif;
      color: #333;
    }

    .settings-container h2 {
      text-align: center;
      color: #333;
    }

    .settings-section {
      margin-bottom: 20px;
      padding: 15px;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .settings-section h3 {
      margin: 0 0 10px;
      color: #555;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .setting-item label {
      font-size: 16px;
      color: #666;
    }

    select {
      padding: 5px;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 14px;
      color: #333;
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
export class SettingsComponent {}
