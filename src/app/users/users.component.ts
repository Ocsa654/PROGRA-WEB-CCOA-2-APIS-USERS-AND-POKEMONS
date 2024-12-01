import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-user-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="table-container">
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Pokédex</h2>
          <div class="header-badge">Total: {{ totalPokemons }}</div>
        </div>
        <div class="card-content">
          <div class="search-container">
            <input
              type="id"
              [(ngModel)]="searchTerm"
              (input)="onSearch()"
              placeholder="Search Pokémon..."
              class="search-input"
            />
          </div>
          <ng-container *ngIf="loading; else loadedContent">
            <div class="skeleton-container">
              <div *ngFor="let item of skeletonItems" class="skeleton"></div>
            </div>
          </ng-container>
          <ng-template #loadedContent>
            <div class="table-responsive">
              <table class="user-table">
                <thead>
                  <tr>
                    <th (click)="sort('id')" class="sortable-header">
                      ID 
                      <span class="sort-icon" [ngClass]="getSortClass('id')">
                        {{ getSortClass('id') === 'ascending' ? '↑' : getSortClass('id') === 'descending' ? '↓' : '↕' }}
                      </span>
                    </th>
                    <th (click)="sort('name')" class="sortable-header">
                      Name 
                      <span class="sort-icon" [ngClass]="getSortClass('name')">
                        {{ getSortClass('name') === 'ascending' ? '↑' : getSortClass('name') === 'descending' ? '↓' : '↕' }}
                      </span>
                    </th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let pokemon of displayedPokemons; trackBy: trackByPokemonId" class="pokemon-row">
                    <td class="id-cell">#{{ pokemon.id.toString().padStart(3, '0') }}</td>
                    <td class="name-cell">{{ pokemon.name | titlecase }}</td>
                    <td class="image-cell">
                      <div class="image-container">
                        <img [src]="pokemon.sprites.front_default" [alt]="pokemon.name" class="avatar">
                      </div>
                    </td>
                    <td class="actions-cell">
                      <button (click)="viewPokemonInfo(pokemon)" class="action-btn info-btn">
                        Info
                      </button>
                      <button (click)="editPokemon(pokemon)" class="action-btn edit-btn">
                        Edit
                      </button>
                      <button (click)="deletePokemon(pokemon)" class="action-btn delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="pagination">
              <span class="pagination-info">Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalPokemons }} entries</span>
              <div class="pagination-buttons">
  <button 
    (click)="goToFirstPage()" 
    [disabled]="currentPage === 1" 
    class="pagination-btn first-page-btn"
    [class.disabled]="currentPage === 1"
  >
    First
  </button>
  <button 
    (click)="previousPage()" 
    [disabled]="currentPage === 1" 
    class="pagination-btn"
    [class.disabled]="currentPage === 1"
  >
    Previous
  </button>
  <span class="page-number">Page {{ currentPage }}</span>
  <button 
    (click)="nextPage()" 
    [disabled]="currentPage * pageSize >= totalPokemons" 
    class="pagination-btn"
    [class.disabled]="currentPage * pageSize >= totalPokemons"
  >
    Next
  </button>
  <button 
    (click)="goToLastPage()" 
    [disabled]="currentPage * pageSize >= totalPokemons" 
    class="pagination-btn last-page-btn"
    [class.disabled]="currentPage * pageSize >= totalPokemons"
  >
    Last
  </button>
</div>
            </div>
          </ng-template>
        </div>
      </div>
      <!-- Modal de Edición -->
    <div *ngIf="showEditModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Edit Pokémon</h3>
          <button class="close-button" (click)="closeEditModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="pokemonName">Name:</label>
            <input
              id="pokemonName"
              type="text"
              [(ngModel)]="tempPokemonName"
              class="form-control"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn cancel-btn" (click)="closeEditModal()">Cancel</button>
          <button class="btn save-btn" (click)="saveEdit()">Save</button>
        </div>
      </div>
    </div>

   <!-- Modal de Info -->
    <div *ngIf="showInfoModal && selectedPokemon" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ selectedPokemon.name | titlecase }} Information</h3>
          <button class="close-button" (click)="closeInfoModal()">&times;</button>
        </div>
        <div class="modal-body pokemon-info">
          <div class="pokemon-image">
            <img 
              [src]="selectedPokemon.sprites.front_default" 
              [alt]="selectedPokemon.name"
              onerror="this.src='assets/placeholder.png'"
            >
          </div>
          <div class="pokemon-details">
            <p><strong>Type:</strong> {{ getTypes() }}</p>
            <p><strong>Abilities:</strong> {{ getAbilities() }}</p>
            <p><strong>Height:</strong> {{ selectedPokemon.height }}</p>
            <p><strong>Weight:</strong> {{ selectedPokemon.weight }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn cancel-btn" (click)="closeInfoModal()">Close</button>
        </div>
      </div>
    </div>

    <!-- Modal de Eliminación -->
    <div *ngIf="showDeleteModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Delete Pokémon</h3>
          <button class="close-button" (click)="closeDeleteModal()">&times;</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete {{ deletingPokemon?.name }}?</p>
        </div>
        <div class="modal-footer">
          <button class="btn cancel-btn" (click)="closeDeleteModal()">Cancel</button>
          <button class="btn delete-btn" (click)="confirmDelete()">Delete</button>
        </div>
      </div>
    </div>
    </div>
  `,
  styles: [`
     :host {
      display: block;
      padding: 20px;
      background-color: #f5f5f5;
      min-height: 100vh;
    }
      .pokemon-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }

    .pokemon-image {
      width: 150px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f8f9fa;
      border-radius: 12px;
      margin-bottom: 20px;
    }

    .pokemon-image img {
      width: 120px;
      height: 120px;
      object-fit: contain;
    }

    .pokemon-details {
      width: 100%;
    }

    .pokemon-details p {
      margin: 10px 0;
      font-size: 16px;
    }

    .pokemon-details strong {
      color: #495057;
      margin-right: 8px;
    }

    .table-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .card-header {
      background: linear-gradient(135deg, #ff6b6b, #ff8e53);
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-title {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .header-badge {
      background: rgba(255, 255, 255, 0.2);
      padding: 6px 12px;
      border-radius: 20px;
      color: white;
      font-size: 14px;
    }

    .card-content {
      padding: 20px;
    }

    /* Search Styles */
    .search-container {
      position: relative;
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      padding: 12px 40px 12px 16px;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      outline: none;
      border-color: #ff6b6b;
    }

    .clear-search-btn {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #6c757d;
      cursor: pointer;
      padding: 4px;
      font-size: 18px;
      line-height: 1;
      border-radius: 50%;
      transition: background-color 0.2s;
    }

    .clear-search-btn:hover {
      background-color: #f0f0f0;
    }

    .no-results {
      text-align: center;
      padding: 40px;
      color: #6c757d;
      font-size: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      margin: 20px 0;
    }

    .table-responsive {
      overflow-x: auto;
      margin-bottom: 20px;
    }

    .user-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }

    .user-table th {
      background: #f8f9fa;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #495057;
      border-bottom: 2px solid #dee2e6;
    }

    .sortable-header {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .sortable-header:hover {
      background: #e9ecef;
    }

    .sort-icon {
      display: inline-block;
      margin-left: 5px;
      color: #6c757d;
    }

    .pokemon-row {
      transition: background-color 0.2s;
    }

    .pokemon-row:hover {
      background-color: #f8f9fa;
    }

    .pokemon-row td {
      padding: 12px;
      border-bottom: 1px solid #dee2e6;
    }

    .id-cell {
      font-family: monospace;
      color: #6c757d;
      font-weight: 600;
    }

    .name-cell {
      font-weight: 500;
      color: #212529;
    }

    .image-container {
      width: 70px;
      height: 70px;
      background: #f8f9fa;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .avatar {
      width: 60px;
      height: 60px;
      object-fit: contain;
    }

    .action-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
      margin: 0 4px;
    }

    .info-btn {
      background: #007bff;
      color: white;
    }

    .info-btn:hover {
      background: #0056b3;
    }

    .edit-btn {
      background: #28a745;
      color: white;
    }

    .edit-btn:hover {
      background: #218838;
    }

    .delete-btn {
      background: #dc3545;
      color: white;
    }

    .delete-btn:hover {
      background: #c82333;
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
    }

    .pagination-info {
      color: #6c757d;
    }

    .pagination-buttons {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .page-number {
      color: #495057;
      font-weight: 500;
    }

    .pagination-btn {
      padding: 8px 16px;
      border: 1px solid #dee2e6;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      color: #495057;
    }

    .pagination-btn:not(.disabled):hover {
      background: #e9ecef;
      border-color: #adb5bd;
    }

    .pagination-btn.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .skeleton-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .skeleton {
      height: 70px;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 8px;
    }

    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
       .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-container {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      padding: 1rem;
      border-bottom: 1px solid #dee2e6;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      margin: 0;
      color: #333;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #666;
      padding: 0;
      line-height: 1;
    }

    .modal-body {
      padding: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      font-size: 1rem;
    }

    .modal-footer {
      padding: 1rem;
      border-top: 1px solid #dee2e6;
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }

    .cancel-btn {
      background-color: #6c757d;
      color: white;
    }

    .save-btn {
      background-color: #28a745;
      color: white;
    }

    .delete-btn {
      background-color: #dc3545;
      color: white;
    }

    .modal-body p {
      margin: 0;
      text-align: center;
      color: #333;
    }
  `]
})
export class UserComponent implements OnInit {
   // Propiedades originales
   pokemons: Pokemon[] = [];
   displayedPokemons: Pokemon[] = [];
   filteredPokemons: Pokemon[] = [];
   totalPokemons = 0;
   loading = true;
   currentPage = 1;
   pageSize = 10;
   sortField: keyof Pokemon | null = null;
   sortDirection: 'asc' | 'desc' | null = null;
   skeletonItems = new Array(5).fill(0);
   searchTerm: string = '';
 
   // Nuevas propiedades para los modales
   showInfoModal = false;
   selectedPokemon: Pokemon | null = null;
   showEditModal = false;
   showDeleteModal = false;
   editingPokemon: Pokemon | null = null;
   deletingPokemon: Pokemon | null = null;
   tempPokemonName: string = '';
 
   constructor(private userService: UserService) {}
 
  
   ngOnInit() {
    this.loadPokemonList();
  }

  loadPokemonList() {
    this.loading = true;
    if (this.searchTerm.trim()) {
      this.searchPokemons();
    } else {
      this.fetchDefaultPokemonList();
    }
  }

  fetchDefaultPokemonList() {
    const offset = (this.currentPage - 1) * this.pageSize;
    this.userService.getPokemonList(this.pageSize, offset).subscribe({
      next: (response) => {
        this.pokemons = response.pokemons;
        this.totalPokemons = response.total;
        this.displayedPokemons = this.pokemons;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon list:', error);
        this.loading = false;
      },
    });
  }

  searchPokemons() {
    this.loading = true;
    const offset = (this.currentPage - 1) * this.pageSize;
    this.userService.searchPokemon(this.searchTerm, this.pageSize, offset).subscribe({
      next: (response) => {
        this.pokemons = response.pokemons;
        this.totalPokemons = response.total;
        this.displayedPokemons = this.pokemons;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching Pokémon:', error);
        this.loading = false;
      },
    });
  }

  onSearch() {
    this.currentPage = 1; // Resetear a la primera página al buscar
    this.loadPokemonList();
  }

  // Métodos de navegación y paginación
  nextPage() {
    if (this.currentPage * this.pageSize < this.totalPokemons) {
      this.currentPage++;
      this.loadPokemonList();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemonList();
    }
  }

  goToFirstPage() {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.loadPokemonList();
    }
  }

  goToLastPage() {
    const lastPage = Math.ceil(this.totalPokemons / this.pageSize);
    if (this.currentPage !== lastPage) {
      this.currentPage = lastPage;
      this.loadPokemonList();
    }
  }
 
 
   filterPokemons() {
     if (!this.searchTerm.trim()) {
       this.filteredPokemons = [...this.pokemons];
     } else {
       const searchTermLower = this.searchTerm.toLowerCase();
       this.filteredPokemons = this.pokemons.filter(pokemon => 
         pokemon.name.toLowerCase().includes(searchTermLower) ||
         pokemon.id.toString().includes(searchTermLower)
       );
     }
     this.updateDisplayedPokemons();
   }
 
   updateDisplayedPokemons() {
     let sortedPokemons = [...this.filteredPokemons];
     if (this.sortField) {
       sortedPokemons.sort((a, b) => {
         const aValue = a[this.sortField!];
         const bValue = b[this.sortField!];
         if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
         if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
         return 0;
       });
     }
     this.displayedPokemons = sortedPokemons;
   }
 
 
   sort(field: keyof Pokemon) {
     if (this.sortField === field) {
       this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
     } else {
       this.sortField = field;
       this.sortDirection = 'asc';
     }
     this.updateDisplayedPokemons();
   }
 
   getSortClass(field: keyof Pokemon): string {
     if (this.sortField === field) {
       return this.sortDirection === 'asc' ? 'ascending' : 'descending';
     }
     return '';
   }
 
   trackByPokemonId(index: number, pokemon: Pokemon) {
     return pokemon.id;
   }
 
   get startIndex(): number {
     return (this.currentPage - 1) * this.pageSize;
   }
 
   get endIndex(): number {
     return Math.min(this.startIndex + this.pageSize, this.totalPokemons);
   }
 
 
 
 
   // Nuevos métodos para el modal de eliminación
   deletePokemon(pokemon: Pokemon) {
     this.deletingPokemon = pokemon;
     this.showDeleteModal = true;
   }
 
   closeDeleteModal() {
     this.showDeleteModal = false;
     this.deletingPokemon = null;
   }
 
   confirmDelete() {
     if (this.deletingPokemon) {
       const index = this.pokemons.findIndex(p => p.id === this.deletingPokemon!.id);
       if (index !== -1) {
         this.pokemons.splice(index, 1);
         this.filterPokemons();
       }
     }
     this.closeDeleteModal();
   }
 
   // Nuevos métodos para el modal de edición
  
 
   closeEditModal() {
     this.showEditModal = false;
     this.editingPokemon = null;
   }


  viewPokemonInfo(pokemon: Pokemon) {
    this.selectedPokemon = { ...pokemon }; // Crear una copia para evitar mutaciones
    this.showInfoModal = true;
  }

  closeInfoModal() {
    this.showInfoModal = false;
    this.selectedPokemon = null;
  }

  getTypes(): string {
    if (!this.selectedPokemon) return '';
    return this.selectedPokemon.types.map(t => t.type.name).join(', ');
  }

  getAbilities(): string {
    if (!this.selectedPokemon) return '';
    return this.selectedPokemon.abilities.map(a => a.ability.name).join(', ');
  }

  editPokemon(pokemon: Pokemon) {
    this.editingPokemon = { ...pokemon }; // Crear una copia para evitar mutaciones
    this.tempPokemonName = pokemon.name;
    this.showEditModal = true;
  }

  saveEdit() {
    if (this.editingPokemon && this.tempPokemonName.trim()) {
      const index = this.pokemons.findIndex(p => p.id === this.editingPokemon!.id);
      if (index !== -1) {
        // Crear un nuevo objeto Pokemon con el nombre actualizado
        this.pokemons[index] = {
          ...this.pokemons[index],
          name: this.tempPokemonName.trim()
        };
        
        // Actualizar las listas filtradas y mostradas
        this.filterPokemons();
      }
    }
    this.closeEditModal();
  }
  
  }