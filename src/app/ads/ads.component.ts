import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [CommonModule], // Agregar CommonModule aquí
  template: `
    <div class="ads-container">
      <h2>Ad Preferences</h2>

      <div class="slider">
        <div class="slide" *ngFor="let slide of slides; let i = index" [ngClass]="{'active-slide': i === currentSlide}">
          <h3>{{ slide.title }}</h3>
          <p class="description">{{ slide.description }}</p>
          <ng-container *ngIf="i === 0">
            <div class="ads-item">
              <label>Allow Personalized Ads</label>
              <input type="checkbox" checked>
            </div>
            <div class="ads-item">
              <label>Exclude Sensitive Topics</label>
              <input type="checkbox">
            </div>
          </ng-container>
          <ng-container *ngIf="i === 1">
            <div class="ads-item">
              <label>Frequency Level</label>
              <select>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </ng-container>
          <ng-container *ngIf="i === 2">
            <div class="ads-item" *ngFor="let type of adTypes">
              <label><input type="checkbox" [checked]="type.checked"> {{ type.label }}</label>
            </div>
          </ng-container>
        </div>
      </div>

      <div class="slider-controls">
        <button (click)="prevSlide()" [disabled]="currentSlide === 0">Previous</button>
        <button (click)="nextSlide()" [disabled]="currentSlide === slides.length - 1">Next</button>
      </div>

      <button class="save-button" (click)="savePreferences()">Save Ad Preferences</button>
    </div>
  `,
  styles: [`
    .ads-container {
      max-width: 700px;
      margin: 40px auto;
      padding: 25px;
      border-radius: 8px;
      background: #f0f4f8;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      font-family: Arial, sans-serif;
      color: #333;
    }

    .ads-container h2 {
      text-align: center;
      color: #333;
    }

    .slider {
      display: flex;
      overflow: hidden;
      height: 180px; /* Ajusta según el contenido */
      margin-bottom: 20px;
      position: relative;
    }

    .slide {
      min-width: 100%;
      transition: transform 0.5s ease;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
    }

    .active-slide {
      opacity: 1;
      position: relative;
    }

    .ads-section h3 {
      color: #555;
    }

    .description {
      font-size: 14px;
      color: #888;
      margin-bottom: 10px;
    }

    .ads-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .ads-item label {
      font-size: 16px;
      color: #666;
    }

    input[type="checkbox"], select {
      transform: scale(1.1);
      accent-color: #4a90e2;
    }

    select {
      padding: 5px;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 14px;
    }

    .slider-controls {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
    }

    .save-button {
      display: block;
      width: 100%;
      padding: 12px;
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
export class AdsComponent {
  currentSlide = 0;
  slides = [
    { title: 'Ad Personalization', description: 'Control whether you want to receive personalized ads based on your activity.' },
    { title: 'Ad Frequency', description: 'Choose how often you want to see ads.' },
    { title: 'Preferred Ad Types', description: 'Select types of ads you are interested in.' }
  ];

  adTypes = [
    { label: 'Technology', checked: true },
    { label: 'Fashion', checked: false },
    { label: 'Health & Fitness', checked: false },
    { label: 'Travel', checked: false }
  ];

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    }
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  savePreferences() {
    alert('Ad preferences saved!');
  }
}
