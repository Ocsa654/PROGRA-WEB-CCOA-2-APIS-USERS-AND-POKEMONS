import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private pokemonApiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private userApiUrl = 'https://api.escuelajs.co/api/v1/users';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number = 10, offset: number = 0): Observable<{ pokemons: Pokemon[], total: number }> {
    return this.http.get<any>(`${this.pokemonApiUrl}?limit=${limit}&offset=${offset}`).pipe(
      map((response) => ({
        pokemonUrls: response.results as { name: string, url: string }[],
        total: response.count as number,
      })),
      switchMap((result) =>
        forkJoin(
          result.pokemonUrls.map((pokemon) => 
            this.http.get<Pokemon>(pokemon.url)
          )
        ).pipe(
          map((pokemons: Pokemon[]) => ({
            pokemons: pokemons,
            total: result.total,
          }))
        )
      )
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/auth/current-user`);
  }
  

  searchPokemon(searchTerm: string, limit: number = 10, offset: number = 0): Observable<{ pokemons: Pokemon[], total: number }> {
    // Convertir el término de búsqueda a minúsculas para hacer la búsqueda insensible a mayúsculas
    const searchTermLower = searchTerm.toLowerCase();

    // Primero, obtener la lista completa de Pokémon
    return this.http.get<any>(`${this.pokemonApiUrl}?limit=100000&offset=0`).pipe(
      map((response) => ({
        pokemonUrls: response.results as { name: string, url: string }[],
        total: response.count as number,
      })),
      switchMap((result) => {
        // Filtrar los Pokémon basados en el término de búsqueda
        const filteredPokemonUrls = result.pokemonUrls.filter(
          pokemon => 
            pokemon.name.toLowerCase().includes(searchTermLower) || 
            pokemon.url.split('/').reverse()[1].includes(searchTermLower)
        );

        // Aplicar paginación a los URLs filtrados
        const paginatedPokemonUrls = filteredPokemonUrls.slice(offset, offset + limit);

        // Obtener los detalles de los Pokémon filtrados
        return forkJoin(
          paginatedPokemonUrls.map((pokemon) => 
            this.http.get<Pokemon>(pokemon.url)
          )
        ).pipe(
          map((pokemons: Pokemon[]) => ({
            pokemons: pokemons,
            total: filteredPokemonUrls.length,
          }))
        );
      })
    );
  }
}